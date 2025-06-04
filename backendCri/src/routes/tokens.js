const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Generate token
router.post('/generate', async (req, res) => {
  try {
    const { symbol, amount, network, walletId, expiryDays } = req.body;

    const wallet = await prisma.wallet.findFirst({
      where: {
        id: walletId,
        userId: req.user.id
      }
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiryDays);

    const token = await prisma.token.create({
      data: {
        symbol,
        amount,
        network,
        walletId,
        expiresAt
      }
    });

    res.json(token);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tokens for a wallet
router.get('/wallet/:walletId', async (req, res) => {
  try {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: req.params.walletId,
        userId: req.user.id
      }
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const tokens = await prisma.token.findMany({
      where: { walletId: req.params.walletId }
    });

    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Transfer token
router.post('/transfer', async (req, res) => {
  try {
    const { fromWalletId, toWalletId, tokenId, amount } = req.body;

    // Verify ownership of source wallet
    const sourceWallet = await prisma.wallet.findFirst({
      where: {
        id: fromWalletId,
        userId: req.user.id
      }
    });

    if (!sourceWallet) {
      return res.status(404).json({ message: 'Source wallet not found' });
    }

    // Verify token exists and belongs to source wallet
    const token = await prisma.token.findFirst({
      where: {
        id: tokenId,
        walletId: fromWalletId
      }
    });

    if (!token) {
      return res.status(404).json({ message: 'Token not found' });
    }

    // Create transfer record (in a real app, this would be more complex)
    // For demo purposes, we'll just create a new token in the destination wallet
    const newToken = await prisma.token.create({
      data: {
        symbol: token.symbol,
        amount,
        network: token.network,
        walletId: toWalletId,
        expiresAt: token.expiresAt
      }
    });

    res.json(newToken);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// Get all wallets for user
router.get('/', async (req, res) => {
  try {
    const wallets = await prisma.wallet.findMany({
      where: { userId: req.user.id },
      include: { tokens: true }
    });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create wallet
router.post('/', async (req, res) => {
  try {
    const { name, address, network } = req.body;
    
    const existingWallet = await prisma.wallet.findUnique({
      where: { address }
    });

    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet address already exists' });
    }

    const wallet = await prisma.wallet.create({
      data: {
        name,
        address,
        network,
        userId: req.user.id
      }
    });
    
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete wallet
router.delete('/:id', async (req, res) => {
  try {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    await prisma.wallet.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Wallet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
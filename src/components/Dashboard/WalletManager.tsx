
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ExternalLink } from 'lucide-react';

const WalletManager = () => {
  // Demo wallets
  const wallets = [
    { name: 'Main Wallet', address: 'TYuPDN4WJYmzAtF9VXTTsSFJQGqJPND7W1', network: 'TRC20', balance: '10,000 USDT' },
    { name: 'Test Wallet', address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', network: 'ERC20', balance: '5.2 ETH' },
    { name: 'Cold Storage', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'BTC', balance: '0.3 BTC' },
  ];

  return (
    <Card className="w-full shadow-lg border border-border/50 crypto-gradient-bg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Connected Wallets</span>
          <Button size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add Wallet
          </Button>
        </CardTitle>
        <CardDescription>
          Manage and monitor your cryptocurrency wallets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="search-wallet">Search</Label>
              <Input id="search-wallet" placeholder="Search by name or address" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wallets.map((wallet, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{wallet.name}</TableCell>
                  <TableCell className="font-mono text-xs">{`${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}</TableCell>
                  <TableCell>{wallet.network}</TableCell>
                  <TableCell>{wallet.balance}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletManager;

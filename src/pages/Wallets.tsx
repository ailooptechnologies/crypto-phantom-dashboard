
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import WalletManager from '@/components/Dashboard/WalletManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Wallets = () => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isWalletDetailsOpen, setIsWalletDetailsOpen] = useState(false);
  
  // Sample wallet data
  const walletDetails = {
    'TYuP...D7W1': {
      name: 'Main Wallet',
      address: 'TYuPDN4WJYmzAtF9VXTTsSFJQGqJPND7W1',
      tokens: [
        { symbol: 'USDT', amount: '10,000', network: 'TRC20' },
        { symbol: 'TRX', amount: '5,000', network: 'TRX' },
        { symbol: 'BTC', amount: '0.05', network: 'BTC' }
      ]
    },
    '0x89...3e7': {
      name: 'Test Wallet',
      address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      tokens: [
        { symbol: 'ETH', amount: '5.2', network: 'ERC20' },
        { symbol: 'USDT', amount: '2,500', network: 'ERC20' },
        { symbol: 'USDC', amount: '1,000', network: 'ERC20' }
      ]
    },
    'bc1q...wlh': {
      name: 'Cold Storage',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      tokens: [
        { symbol: 'BTC', amount: '0.3', network: 'BTC' }
      ]
    }
  };

  const handleViewDetails = (walletId: string) => {
    setSelectedWallet(walletId);
    setIsWalletDetailsOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Wallet Management</h1>
        <p className="text-muted-foreground">
          Connect and manage your cryptocurrency wallets
        </p>
      </div>

      <Tabs defaultValue="wallets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wallets">Connected Wallets</TabsTrigger>
          <TabsTrigger value="balances">Token Balances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wallets">
          <WalletManager />
        </TabsContent>
        
        <TabsContent value="balances">
          <Card className="w-full shadow-lg border border-border/50 crypto-gradient-bg">
            <CardHeader>
              <CardTitle>Token Balances</CardTitle>
              <CardDescription>
                View balances of your generated dummy tokens across wallets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Main Wallet (TYuP...D7W1)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>USDT</span>
                        <span className="font-semibold">10,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>TRX</span>
                        <span className="font-semibold">5,000</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2" 
                        variant="outline"
                        onClick={() => handleViewDetails('TYuP...D7W1')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Test Wallet (0x89...3e7)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>ETH</span>
                        <span className="font-semibold">5.2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>USDT (ERC20)</span>
                        <span className="font-semibold">2,500</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2" 
                        variant="outline"
                        onClick={() => handleViewDetails('0x89...3e7')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Cold Storage (bc1q...wlh)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>BTC</span>
                        <span className="font-semibold">0.3</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-2" 
                        variant="outline"
                        onClick={() => handleViewDetails('bc1q...wlh')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wallet Details Dialog */}
      <Dialog open={isWalletDetailsOpen} onOpenChange={setIsWalletDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedWallet && walletDetails[selectedWallet as keyof typeof walletDetails].name} Details
            </DialogTitle>
            <DialogDescription>
              View detailed information about this wallet's assets and balance
            </DialogDescription>
          </DialogHeader>
          
          {selectedWallet && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Wallet Address:</p>
                <p className="font-mono text-sm break-all border p-2 rounded-md bg-muted/20">
                  {walletDetails[selectedWallet as keyof typeof walletDetails].address}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Token Balances</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {walletDetails[selectedWallet as keyof typeof walletDetails].tokens.map((token, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{token.symbol}</TableCell>
                        <TableCell>{token.network}</TableCell>
                        <TableCell className="text-right font-medium">{token.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setIsWalletDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Wallets;

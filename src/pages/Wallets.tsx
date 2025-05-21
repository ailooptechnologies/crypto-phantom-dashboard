
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import WalletManager from '@/components/Dashboard/WalletManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Wallets = () => {
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
                      <Button size="sm" className="w-full mt-2" variant="outline">View Details</Button>
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
                      <Button size="sm" className="w-full mt-2" variant="outline">View Details</Button>
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
                      <Button size="sm" className="w-full mt-2" variant="outline">View Details</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Wallets;

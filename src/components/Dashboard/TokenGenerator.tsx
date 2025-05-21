
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const TokenGenerator = () => {
  const [amount, setAmount] = useState('1000');
  const [tokenType, setTokenType] = useState('tether');
  const [network, setNetwork] = useState('trc20');
  const [expiry, setExpiry] = useState('90');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast.success(`${amount} dummy ${tokenType.toUpperCase()} tokens created successfully on ${network.toUpperCase()} network`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full shadow-lg border border-border/50 crypto-gradient-bg">
      <CardHeader>
        <CardTitle>Generate Dummy Tokens</CardTitle>
        <CardDescription>
          Create dummy cryptocurrency tokens that will expire after the selected time period
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="token-type">Select Token Type</Label>
            <Select value={tokenType} onValueChange={setTokenType}>
              <SelectTrigger id="token-type">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tether">USDT (Tether)</SelectItem>
                <SelectItem value="bitcoin">BTC (Bitcoin)</SelectItem>
                <SelectItem value="ethereum">ETH (Ethereum)</SelectItem>
                <SelectItem value="tron">TRX (Tron)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="network">Select Network</Label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger id="network">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trc20">TRC20 (Tron)</SelectItem>
                <SelectItem value="erc20">ERC20 (Ethereum)</SelectItem>
                <SelectItem value="bep20">BEP20 (Binance)</SelectItem>
                <SelectItem value="solana">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input 
              id="amount" 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wallet-address">Destination Wallet Address</Label>
            <Input 
              id="wallet-address" 
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="expiry">Token Expiry (days): {expiry}</Label>
            </div>
            <Slider 
              id="expiry"
              min={10} 
              max={90} 
              step={1}
              value={[parseInt(expiry)]}
              onValueChange={([val]) => setExpiry(val.toString())}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 days</span>
              <span>90 days</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !walletAddress}
          >
            {isLoading ? 'Generating...' : 'Generate Tokens'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TokenGenerator;

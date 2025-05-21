
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ExternalLink, MoreVertical, Copy, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const WalletManager = () => {
  // Demo wallets initial data
  const initialWallets = [
    { name: 'Main Wallet', address: 'TYuPDN4WJYmzAtF9VXTTsSFJQGqJPND7W1', network: 'TRC20', balance: '10,000 USDT' },
    { name: 'Test Wallet', address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', network: 'ERC20', balance: '5.2 ETH' },
    { name: 'Cold Storage', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'BTC', balance: '0.3 BTC' },
  ];

  const [wallets, setWallets] = useState(initialWallets);
  const [filteredWallets, setFilteredWallets] = useState(initialWallets);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [newWallet, setNewWallet] = useState({ name: '', address: '', network: 'TRC20' });
  const { toast } = useToast();

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredWallets(wallets);
      return;
    }
    
    const filtered = wallets.filter(
      wallet => 
        wallet.name.toLowerCase().includes(query) || 
        wallet.address.toLowerCase().includes(query)
    );
    setFilteredWallets(filtered);
  };

  // Add new wallet
  const handleAddWallet = () => {
    if (!newWallet.name || !newWallet.address) {
      toast({
        title: "Validation Error",
        description: "Please provide both wallet name and address.",
        variant: "destructive"
      });
      return;
    }

    const updatedWallets = [
      ...wallets, 
      { 
        ...newWallet, 
        balance: newWallet.network === 'TRC20' ? '0 USDT' : 
                 newWallet.network === 'ERC20' ? '0 ETH' : 
                 newWallet.network === 'BTC' ? '0 BTC' : '0'
      }
    ];
    
    setWallets(updatedWallets);
    setFilteredWallets(updatedWallets);
    setNewWallet({ name: '', address: '', network: 'TRC20' });
    setIsAddWalletOpen(false);
    
    toast({
      title: "Wallet Added",
      description: "New wallet has been added successfully."
    });
  };

  // Copy wallet address
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard."
    });
  };

  // Remove wallet
  const removeWallet = (address: string) => {
    const updatedWallets = wallets.filter(wallet => wallet.address !== address);
    setWallets(updatedWallets);
    setFilteredWallets(updatedWallets);
    
    toast({
      title: "Wallet Removed",
      description: "Wallet has been removed from your list."
    });
  };

  // View wallet on explorer
  const viewOnExplorer = (address: string, network: string) => {
    let explorerUrl = '';
    switch (network) {
      case 'TRC20':
        explorerUrl = `https://tronscan.org/#/address/${address}`;
        break;
      case 'ERC20':
        explorerUrl = `https://etherscan.io/address/${address}`;
        break;
      case 'BTC':
        explorerUrl = `https://www.blockchain.com/explorer/addresses/btc/${address}`;
        break;
      default:
        explorerUrl = '';
    }
    
    if (explorerUrl) {
      window.open(explorerUrl, '_blank');
    }
  };

  return (
    <Card className="w-full shadow-lg border border-border/50 crypto-gradient-bg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Connected Wallets</span>
          <Button size="sm" className="flex items-center" onClick={() => setIsAddWalletOpen(true)}>
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
              <Input 
                id="search-wallet" 
                placeholder="Search by name or address" 
                value={searchQuery}
                onChange={handleSearch}
              />
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
              {filteredWallets.length > 0 ? (
                filteredWallets.map((wallet, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{wallet.name}</TableCell>
                    <TableCell className="font-mono text-xs">{`${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}</TableCell>
                    <TableCell>{wallet.network}</TableCell>
                    <TableCell>{wallet.balance}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyToClipboard(wallet.address)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Address
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => viewOnExplorer(wallet.address, wallet.network)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on Explorer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => removeWallet(wallet.address)} className="text-red-500 focus:text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove Wallet
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No wallets found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Wallet Dialog */}
      <Dialog open={isAddWalletOpen} onOpenChange={setIsAddWalletOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Wallet</DialogTitle>
            <DialogDescription>
              Enter the details of the wallet you want to add to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="wallet-name">Wallet Name</Label>
              <Input 
                id="wallet-name" 
                placeholder="My New Wallet"
                value={newWallet.name}
                onChange={(e) => setNewWallet({...newWallet, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Wallet Address</Label>
              <Input 
                id="wallet-address" 
                placeholder="Enter wallet address"
                value={newWallet.address}
                onChange={(e) => setNewWallet({...newWallet, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="network">Network</Label>
              <Select 
                value={newWallet.network} 
                onValueChange={(value) => setNewWallet({...newWallet, network: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TRC20">TRC20 (Tron)</SelectItem>
                  <SelectItem value="ERC20">ERC20 (Ethereum)</SelectItem>
                  <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                  <SelectItem value="BEP20">BEP20 (Binance Smart Chain)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWalletOpen(false)}>Cancel</Button>
            <Button onClick={handleAddWallet}>Add Wallet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WalletManager;

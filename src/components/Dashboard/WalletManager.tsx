import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, MoreVertical, Copy, Trash, ArrowRightLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getWallets, createWallet, deleteWallet } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const WalletManager = () => {
  // Demo wallets initial data
  const initialWallets = [
    { name: 'Main Wallet', address: 'TYuPDN4WJYmzAtF9VXTTsSFJQGqJPND7W1', network: 'TRC20', balance: '10,000 USDT' },
    { name: 'Test Wallet', address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', network: 'ERC20', balance: '5.2 ETH' },
    { name: 'Cold Storage', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'BTC', balance: '0.3 BTC' },
  ];

  const queryClient = useQueryClient();
  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: getWallets
  });
  const [filteredWallets, setFilteredWallets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [newWallet, setNewWallet] = useState({ name: '', address: '', network: 'TRC20' });
  const [transferDetails, setTransferDetails] = useState({
    fromWallet: '',
    toWallet: '',
    amount: '',
    token: ''
  });
  const { toast } = useToast();
  
  const createWalletMutation = useMutation({
    mutationFn: createWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      setIsAddWalletOpen(false);
      toast({
        title: "Wallet Added",
        description: "New wallet has been added successfully."
      });
    }
  });

  const deleteWalletMutation = useMutation({
    mutationFn: deleteWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      toast({
        title: "Wallet Removed",
        description: "Wallet has been removed from your list."
      });
    }
  });

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredWallets(wallets.data);
      return;
    }
    
    const filtered = wallets.data.filter(
      wallet => 
        wallet.name.toLowerCase().includes(query) || 
        wallet.address.toLowerCase().includes(query)
    );
    setFilteredWallets(filtered);
  };

  // Add new wallet
  const handleAddWallet = async () => {
    if (!newWallet.name || !newWallet.address) {
      toast({
        title: "Validation Error",
        description: "Please provide both wallet name and address.",
        variant: "destructive"
      });
      return;
    }

    
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

  // Open transfer dialog with selected wallet
  const openTransferDialog = (fromWallet: string) => {
    setTransferDetails({
      ...transferDetails,
      fromWallet
    });
    setIsTransferOpen(true);
  };

  // Handle transfer submission
  const handleTransfer = () => {
    const { fromWallet, toWallet, amount, token } = transferDetails;
    
    if (!fromWallet || !toWallet || !amount || !token) {
      toast({
        title: "Validation Error",
        description: "Please fill in all transfer details.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to process the transfer
    toast({
      title: "Transfer Initiated",
      description: `${amount} ${token} has been sent from ${fromWallet} to ${toWallet}.`
    });
    
    setIsTransferOpen(false);
    setTransferDetails({
      fromWallet: '',
      toWallet: '',
      amount: '',
      token: ''
    });
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
                          <DropdownMenuItem onClick={() => openTransferDialog(wallet.name)}>
                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                            Transfer Crypto
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

      {/* Transfer Crypto Dialog */}
      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Crypto</DialogTitle>
            <DialogDescription>
              Send cryptocurrency from your wallet to another address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="from-wallet">From Wallet</Label>
              <Select 
                value={transferDetails.fromWallet} 
                onValueChange={(value) => setTransferDetails({...transferDetails, fromWallet: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Source Wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((wallet, idx) => (
                    <SelectItem key={idx} value={wallet.name}>{wallet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-wallet">To Wallet</Label>
              <Select 
                value={transferDetails.toWallet} 
                onValueChange={(value) => setTransferDetails({...transferDetails, toWallet: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Destination Wallet" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((wallet, idx) => (
                    <SelectItem key={idx} value={wallet.name}>{wallet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                placeholder="Enter amount"
                value={transferDetails.amount}
                onChange={(e) => setTransferDetails({...transferDetails, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Token</Label>
              <Select 
                value={transferDetails.token} 
                onValueChange={(value) => setTransferDetails({...transferDetails, token: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="TRX">TRX</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferOpen(false)}>Cancel</Button>
            <Button onClick={handleTransfer}>Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WalletManager;
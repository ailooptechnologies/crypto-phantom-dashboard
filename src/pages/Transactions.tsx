
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import TransactionHistory from '@/components/Dashboard/TransactionHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState('all');
  const [filteredData, setFilteredData] = useState<any>(null);

  const handleSearch = () => {
    const filters = {
      id: searchQuery ? searchQuery : undefined,
      token: selectedToken !== 'all' ? selectedToken.toUpperCase() : undefined
    };
    setFilteredData(filters);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-muted-foreground">
          View and track all your dummy cryptocurrency transactions
        </p>
      </div>

      <Card className="mb-6 shadow-lg border border-border/50 crypto-gradient-bg">
        <CardHeader>
          <CardTitle>Transaction Search</CardTitle>
          <CardDescription>
            Find specific transactions in your history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input 
                placeholder="Search by transaction ID" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="btc">BTC</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                  <SelectItem value="trx">TRX</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="md:mt-0" onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>

      <TransactionHistory filters={filteredData} />
    </DashboardLayout>
  );
};

export default Transactions;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  token: string;
  amount: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  expiresIn: string;
}

const TransactionHistory = () => {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 'tx123456',
      token: 'USDT',
      amount: '1,000',
      from: 'TYuP...D7W1',
      to: 'TEwz...V9T3',
      timestamp: '2023-05-20 14:30',
      status: 'confirmed',
      expiresIn: '85 days'
    },
    {
      id: 'tx789012',
      token: 'BTC',
      amount: '0.05',
      from: 'bc1q...wlh',
      to: 'bc1p...j9q',
      timestamp: '2023-05-19 11:15',
      status: 'confirmed',
      expiresIn: '62 days'
    },
    {
      id: 'tx345678',
      token: 'ETH',
      amount: '2.5',
      from: '0x89...3e7',
      to: '0x71...8f2',
      timestamp: '2023-05-18 09:45',
      status: 'confirmed',
      expiresIn: '32 days'
    },
    {
      id: 'tx901234',
      token: 'TRX',
      amount: '5,000',
      from: 'TYuP...D7W1',
      to: 'TFcz...Q7P2',
      timestamp: '2023-05-17 16:20',
      status: 'confirmed',
      expiresIn: '21 days'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/50">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Pending</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/50">Failed</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-lg border border-border/50 crypto-gradient-bg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          View your recent cryptocurrency transactions and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                <TableCell>{tx.token}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                <TableCell>{tx.timestamp}</TableCell>
                <TableCell>{getStatusBadge(tx.status)}</TableCell>
                <TableCell>{tx.expiresIn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;

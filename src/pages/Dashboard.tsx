
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import CryptoCard from '@/components/ui/CryptoCard';
import TokenGenerator from '@/components/Dashboard/TokenGenerator';
import WalletManager from '@/components/Dashboard/WalletManager';
import TransactionHistory from '@/components/Dashboard/TransactionHistory';
import TokenModel from '@/components/Dashboard/TokenModel';
import { Wallet, Plus, BarChart, Bitcoin, Database } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Generate and manage your dummy cryptocurrency tokens
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CryptoCard 
          type="tether" 
          title="USDT" 
          amount="25,000" 
          icon={<Database className="h-5 w-5" />} 
        />
        <CryptoCard 
          type="bitcoin" 
          title="BTC" 
          amount="1.25" 
          icon={<Bitcoin className="h-5 w-5" />} 
        />
        <CryptoCard 
          type="ethereum" 
          title="ETH" 
          amount="12.5" 
          icon={<Database className="h-5 w-5" />} 
        />
        <CryptoCard 
          type="tron" 
          title="TRX" 
          amount="50,000" 
          icon={<Database className="h-5 w-5" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TokenModel color="#3387FF" />
        <TokenGenerator />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TransactionHistory />
        <WalletManager />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

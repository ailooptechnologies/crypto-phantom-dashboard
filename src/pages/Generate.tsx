
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import TokenGenerator from '@/components/Dashboard/TokenGenerator';
import TokenModel from '@/components/Dashboard/TokenModel';

const Generate = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Generate Tokens</h1>
        <p className="text-muted-foreground">
          Create new dummy crypto tokens that will expire after a set time
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TokenModel color="#FF9416" scale={1.5} />
          <div className="p-4 rounded-lg border border-border/50 bg-card">
            <h2 className="text-xl font-semibold mb-4">About Dummy Tokens</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span>Tokens behave like real ones with full transaction confirmations</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span>Transferable to unlimited wallets across major networks</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span>Visible in wallet addresses for your selected timeframe</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span>Auto-expire between 10-90 days based on your selection</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                <span>No limit on how much can be generated or transferred</span>
              </li>
            </ul>
          </div>
        </div>
        <TokenGenerator />
      </div>
    </DashboardLayout>
  );
};

export default Generate;


import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <Card className="shadow-lg border border-border/50 crypto-gradient-bg">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security settings for your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="ip-restriction" />
              <Label htmlFor="ip-restriction">Enable IP Address Restriction</Label>
            </div>
            
            <Button>Update Security Settings</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border border-border/50 crypto-gradient-bg">
          <CardHeader>
            <CardTitle>Default Token Settings</CardTitle>
            <CardDescription>
              Set your default preferences for token generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-network">Default Network</Label>
                <select 
                  id="default-network" 
                  className="w-full p-2 rounded-md border border-border bg-background"
                >
                  <option value="trc20">TRC20 (Tron)</option>
                  <option value="erc20">ERC20 (Ethereum)</option>
                  <option value="bep20">BEP20 (Binance)</option>
                  <option value="solana">Solana</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-expiry">Default Token Expiry (days)</Label>
                <Input id="default-expiry" type="number" defaultValue="90" min="10" max="90" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-token">Default Token Type</Label>
                <select 
                  id="default-token" 
                  className="w-full p-2 rounded-md border border-border bg-background"
                >
                  <option value="usdt">USDT (Tether)</option>
                  <option value="btc">BTC (Bitcoin)</option>
                  <option value="eth">ETH (Ethereum)</option>
                  <option value="trx">TRX (Tron)</option>
                </select>
              </div>
            </div>
            
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg border border-border/50 crypto-gradient-bg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage authorized users (limited to 2 users)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-secondary/50 border border-border/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Primary Admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Username:</span>
                    <span>admin1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span>Administrator</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-secondary/50 border border-border/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Secondary Admin</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Username:</span>
                    <span>admin2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span>Administrator</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

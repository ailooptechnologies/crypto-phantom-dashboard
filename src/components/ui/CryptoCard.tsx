
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CryptoType = 'bitcoin' | 'ethereum' | 'tether' | 'tron' | 'solana';

interface CryptoCardProps {
  type: CryptoType;
  title: string;
  amount: string;
  icon: React.ReactNode;
  className?: string;
}

const CryptoCard = ({ type, title, amount, icon, className }: CryptoCardProps) => {
  const gradientClass = `${type}-gradient`;

  return (
    <Card className={cn("border-none overflow-hidden", className)}>
      <div className={cn("h-2", gradientClass)} />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {title}
          <div className="text-lg">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{amount}</p>
        <p className="text-xs text-muted-foreground mt-1">Dummy tokens generated</p>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;

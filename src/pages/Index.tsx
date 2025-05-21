
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TokenModel from '@/components/Dashboard/TokenModel';
import { ArrowRight, CheckCircle, Database, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary mr-6">CryptoDummy</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Features</a>
            <a href="#tokens" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Tokens</a>
            <a href="#networks" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Networks</a>
          </nav>
          <Button onClick={handleGetStarted}>Dashboard Login</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-tether/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container flex flex-col md:flex-row items-center z-10 relative">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Secure Dummy <span className="text-primary">Crypto</span> Token Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate and manage dummy cryptocurrencies that behave like real ones with full transaction confirmations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <TokenModel color="#3387FF" scale={1.8} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform provides everything you need to create and manage dummy cryptocurrency tokens with realistic behavior.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Realistic Blockchain Confirmations",
                description: "Transactions appear as successful with 100% confirmation on blockchain explorers.",
                icon: <CheckCircle className="h-10 w-10 text-primary" />
              },
              {
                title: "Unlimited Token Generation",
                description: "No limits on how many dummy tokens can be created or transferred daily.",
                icon: <Database className="h-10 w-10 text-primary" />
              },
              {
                title: "Customizable Expiry",
                description: "Set token lifespan between 10-90 days to suit your testing needs.",
                icon: <Shield className="h-10 w-10 text-primary" />
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tokens */}
      <section id="tokens" className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-40 w-80 h-80 bg-bitcoin/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-40 w-80 h-80 bg-ethereum/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Supported Tokens</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform supports generation of multiple cryptocurrency tokens that mimic real behavior.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "USDT",
                fullName: "Tether",
                description: "The most widely used stablecoin pegged to USD.",
                colorClass: "tether-gradient"
              },
              {
                name: "BTC",
                fullName: "Bitcoin",
                description: "The original cryptocurrency that started it all.",
                colorClass: "bitcoin-gradient"
              },
              {
                name: "ETH",
                fullName: "Ethereum",
                description: "Leading platform for decentralized applications.",
                colorClass: "ethereum-gradient"
              },
              {
                name: "TRX",
                fullName: "Tron",
                description: "High throughput blockchain for digital content.",
                colorClass: "tron-gradient"
              }
            ].map((token, index) => (
              <div key={index} className="rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow">
                <div className={`h-2 ${token.colorClass}`} />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{token.name}</h3>
                  <h4 className="text-sm text-muted-foreground mb-4">{token.fullName}</h4>
                  <p className="text-sm">{token.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Networks */}
      <section id="networks" className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Compatible Networks</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our dummy tokens work seamlessly across all major blockchain networks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "TRC20",
                description: "Tron's token standard, offering high throughput and low fees.",
                features: ["Fast transactions", "Low fees", "High throughput"]
              },
              {
                name: "ERC20",
                description: "Ethereum's most popular token standard with wide adoption.",
                features: ["Widespread compatibility", "Smart contract support", "Robust security"]
              },
              {
                name: "BEP20",
                description: "Binance Smart Chain standard with high performance.",
                features: ["Low transaction costs", "High speed", "Cross-chain compatibility"]
              },
              {
                name: "Solana",
                description: "Ultra-fast blockchain with minimal transaction fees.",
                features: ["Lightning-fast transactions", "Scalable architecture", "Low cost"]
              }
            ].map((network, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{network.name}</h3>
                <p className="text-muted-foreground mb-4">{network.description}</p>
                <ul className="space-y-2">
                  {network.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-background/90 via-background to-primary/5" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Access your secure dashboard to begin generating and managing dummy cryptocurrency tokens.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={handleGetStarted}>
                Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">CryptoDummy</h3>
              <p className="text-sm text-muted-foreground">Secure dummy cryptocurrency generator</p>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CryptoDummy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

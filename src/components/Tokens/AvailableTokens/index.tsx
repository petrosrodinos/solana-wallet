import React from "react";
import AvailableTokenCard from "./AvailableTokenCard";

const tokensForSale = [
  {
    name: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    totalSupply: 10000,
    sold: 3500,
    price: "0.1 SOL",
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    totalSupply: 50000,
    sold: 12000,
    price: "1 USDC",
  },
  {
    name: "Raydium",
    symbol: "RAY",
    image: "https://cryptologos.cc/logos/raydium-ray-logo.png",
    totalSupply: 20000,
    sold: 7000,
    price: "0.5 SOL",
  },
  {
    name: "Serum",
    symbol: "SRM",
    image: "https://cryptologos.cc/logos/serum-srm-logo.png",
    totalSupply: 15000,
    sold: 9000,
    price: "0.3 SOL",
  },
];

const AvailableTokens: React.FC = () => {
  const handleBuyToken = (tokenName: string) => {
    console.log(`Buying ${tokenName}...`);
  };

  return (
    <div className="w-full mt-5">
      <h3 className="text-xl font-semibold text-white mb-4">Available Tokens</h3>
      <div className="bg-white/10 rounded-xl shadow-lg backdrop-blur-md p-4 space-y-4">
        {tokensForSale.map((token, index) => (
          <AvailableTokenCard key={index} token={token} onBuy={handleBuyToken} />
        ))}
      </div>
    </div>
  );
};

export default AvailableTokens;

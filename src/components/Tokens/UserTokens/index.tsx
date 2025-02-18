import React from "react";
import { Link } from "react-router";
import UserTokenCard from "./UserTokenCard";

const tokens = [
  {
    name: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    name: "Raydium",
    symbol: "RAY",
    image: "https://cryptologos.cc/logos/raydium-ray-logo.png",
  },
  {
    name: "Serum",
    symbol: "SRM",
    image: "https://cryptologos.cc/logos/serum-srm-logo.png",
  },
];

const UserTokens: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">My Tokens</h3>
        <Link
          to="/tokens/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Create a Token
        </Link>
      </div>
      <div className="bg-white/10 rounded-xl shadow-lg backdrop-blur-md p-4 space-y-4">
        {tokens.map((token, index) => (
          <UserTokenCard key={index} token={token} />
        ))}
      </div>
    </div>
  );
};

export default UserTokens;

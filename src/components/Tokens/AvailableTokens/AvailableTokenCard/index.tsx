import React from "react";
import { Token } from "../../../../interfaces/token";

interface TokenProps {
  token: Token;
  onBuy: (token: Token) => void;
}

const AvailableTokenCard: React.FC<TokenProps> = ({ token, onBuy }) => {
  const { name, symbol, image, totalSupply, sold, price } = token;
  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-600">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="text-sm font-medium text-white">{name}</h3>
          <p className="text-xs text-gray-400">{symbol}</p>
          <p className="text-xs text-gray-400">
            Sold: {sold || 0} / {totalSupply}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-300 text-sm font-semibold">{price}</p>
        <button
          onClick={() => onBuy(token)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default AvailableTokenCard;

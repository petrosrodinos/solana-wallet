import React from "react";

interface UserTokenCardProps {
  token: {
    name: string;
    symbol: string;
    image: string;
  };
  onStake?: (tokenName: string) => void;
}

const UserTokenCard: React.FC<UserTokenCardProps> = ({
  token: { name, symbol, image },
  onStake,
}) => {
  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-600">
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="text-sm font-medium text-white">{name}</h3>
          <p className="text-xs text-gray-400">{symbol}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-300 text-sm font-semibold">0.00</p>
        <button
          onClick={() => onStake && onStake(name)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition"
        >
          Stake
        </button>
      </div>
    </div>
  );
};

export default UserTokenCard;

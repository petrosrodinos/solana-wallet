import { FC } from "react";
import { useWalletStore } from "../../../store/wallet";

const Header: FC = () => {
  const { publicKey } = useWalletStore((state) => state);

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md w-full max-w-lg text-center">
      <h2 className="text-2xl font-semibold mb-2">Your Wallet</h2>
      <p className="text-gray-300">Public Key:</p>
      <p className="text-sm break-all bg-gray-700 p-2 rounded-lg mt-1">{publicKey}</p>
      <p className="text-gray-300 mt-4">Balance:</p>
      <p className="text-3xl font-bold text-green-400">150 SOL</p>
    </div>
  );
};

export default Header;

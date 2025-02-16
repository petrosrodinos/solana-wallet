import { ArrowDown, ArrowUp, CreditCard, RefreshCcw } from "lucide-react";
import { FC } from "react";
import { useWallet } from "../../../hooks/useWallet";
import Spinner from "../../../components/ui/Spinner";
import Alert from "../../../components/ui/Alert";

const ActionButtons: FC = () => {
  const { getAirdrop, loading, error } = useWallet();

  const handleReceive = () => {
    getAirdrop();
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={handleReceive}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <ArrowDown size={20} /> Airdrop
        </button>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          <ArrowUp size={20} /> Send
        </button>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          <RefreshCcw size={20} /> Swap
        </button>
        <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
          <CreditCard size={20} /> Buy
        </button>
      </div>
      <Spinner className="mt-2" visible={loading} />
      {error && <Alert text={error} variant="error" />}
    </div>
  );
};

export default ActionButtons;

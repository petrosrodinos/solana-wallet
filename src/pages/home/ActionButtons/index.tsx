import { ArrowDown, ArrowUp, CreditCard, RefreshCcw } from "lucide-react";
import { FC, useState } from "react";
import { useWallet } from "../../../hooks/useWallet";
import Spinner from "../../../components/ui/Spinner";
import Alert from "../../../components/ui/Alert";
import Modal from "../../../components/ui/Modal";
import SendTokens from "./SendTokens";

const ActionButtons: FC = () => {
  const { getAirdrop, loading, error } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleReceive = () => {
    getAirdrop();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          disabled={loading}
          onClick={handleReceive}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <ArrowDown size={20} /> Airdrop
        </button>
        <button
          disabled={loading}
          onClick={toggleModal}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <ArrowUp size={20} /> Send
        </button>
        <button
          disabled={loading}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <RefreshCcw size={20} /> Swap
        </button>
        <button
          disabled={loading}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          <CreditCard size={20} /> Buy
        </button>
      </div>
      <Spinner className="mt-2" visible={loading} />
      {error && <Alert text={error} variant="error" />}

      <Modal title="Send Tokens" open={isModalOpen} onClose={toggleModal}>
        <SendTokens onSend={toggleModal} />
      </Modal>
    </div>
  );
};

export default ActionButtons;

import { FC, useEffect, useState } from "react";
import PinInput from "../../../../components/Pin";
import { useWallet } from "../../../../hooks/useWallet";
import usePin from "../../../../hooks/usePin";
import Spinner from "../../../../components/ui/Spinner";
import Alert from "../../../../components/ui/Alert";
interface SendTokensProps {
  onSend: () => void;
}

const SendTokens: FC<SendTokensProps> = ({ onSend }) => {
  const { sendTokens, loading, error: walletError } = useWallet();
  const { visible, togglePinPrompt } = usePin();

  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePinConfirm = async (pin: string) => {
    await sendTokens(recipient, amount, pin);
    onSend();
  };

  const handleSubmit = async () => {
    if (!amount || !recipient) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    togglePinPrompt();
  };

  return (
    <>
      {!visible && (
        <div className="max-w-sm w-full p-3 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Send Tokens</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient address"
            />
          </div>

          <Alert variant="error" text={walletError} />

          {!loading && (
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          )}

          <Spinner visible={loading} />
        </div>
      )}
      {visible && <PinInput confirm onConfirm={handlePinConfirm} />}
    </>
  );
};

export default SendTokens;

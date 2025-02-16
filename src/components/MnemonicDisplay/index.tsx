import { useState } from "react";
import { useWalletStore } from "../../store/wallet";
import { useNavigate } from "react-router";

const MnemonicDisplay = () => {
  const { mnemonic, removeMnemonic } = useWalletStore((state) => state);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleRedirectToWallet = () => {
    removeMnemonic();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Mnemonic</h2>

        <p className="text-gray-600 mb-6">
          This is your mnemonic phrase. Make sure to store it securely. You can copy it to your
          clipboard by clicking the button below.
        </p>

        <div className="mb-6">
          <div className="p-4 bg-gray-200 text-gray-800 rounded-md break-all">{mnemonic}</div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>

          <button
            onClick={handleRedirectToWallet}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go to Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default MnemonicDisplay;

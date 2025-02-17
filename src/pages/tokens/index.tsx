import { useState } from "react";
import { useToken } from "../../hooks/useToken";
import { toast } from "react-toastify";
import { TEST_MNEMONIC } from "../../constants";

const Tokens = () => {
  const { createToken } = useToken();
  const [quantity, setQuantity] = useState("");

  const handleCreateAndMintToken = async () => {
    if (!quantity) {
      toast.error("Please enter a quantity to mint.");
      return;
    }
    await createToken(TEST_MNEMONIC, quantity);
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">SPL Token Creator</h2>

      <div className="mb-4">
        <label className="block text-sm mb-1">Quantity to Mint:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
      </div>

      <button
        onClick={handleCreateAndMintToken}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create & Mint Token
      </button>
    </div>
  );
};

export default Tokens;

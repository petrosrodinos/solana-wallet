import { useState } from "react";
import { toast } from "react-toastify";
import { createAndMintToken } from "../services/token";

export const useToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createToken = async (
    mnemonic: string,
    quantity: string,
    name: string,
    symbol: string,
    uri: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await createAndMintToken(mnemonic, quantity, name, symbol, uri);
      toast.success("Token created successfully!");
    } catch (err) {
      console.error("Failed to create token.", err);
      setError("Failed to create token.");
    } finally {
      setLoading(false);
    }
  };

  return { createToken, loading, error };
};

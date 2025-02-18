import { useState } from "react";
import { toast } from "react-toastify";
import { createAndMintToken, getUserTokens } from "../services/token";
import { useWalletStore } from "../store/wallet";

export const useToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey } = useWalletStore();

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

  const getTokens = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await getUserTokens(publicKey);
      return tokens;
    } catch (err) {
      console.error("Failed to fetch tokens.", err);
      setError("Failed to fetch tokens.");
      toast.error("Failed to fetch tokens.");
    } finally {
      setLoading(false);
    }
  };

  return { createToken, getTokens, loading, error };
};

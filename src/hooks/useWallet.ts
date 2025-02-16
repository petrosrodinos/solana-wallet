import { useState, useEffect } from "react";
import { useWalletStore } from "../store/wallet";
import { getBalance } from "../services/wallet";

export const useWallet = () => {
  const { publicKey } = useWalletStore((state) => state);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  const fetchBalance = async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      const balanceSol = await getBalance(publicKey);
      setBalance(balanceSol);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setError("Failed to fetch balance.");
    } finally {
      setLoading(false);
    }
  };

  return { balance, loading, error };
};

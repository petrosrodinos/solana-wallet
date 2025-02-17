import { useState } from "react";
import { useWalletStore } from "../store/wallet";
import { getBalance, requestAirdrop, sendTransaction, getTransactions } from "../services/wallet";
import { decryptMnemonic } from "../utils/wallet";
import { parseTransactions } from "../utils/transaction";
import { toast } from "react-toastify";

export const useWallet = () => {
  const { publicKey, encryptedMnemonic } = useWalletStore((state) => state);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const getAirdrop = async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      await requestAirdrop(publicKey);
      fetchBalance();
      toast.success("Airdrop successful");
    } catch (err) {
      console.error("Error requesting airdrop:", err);
      setError("Failed to request airdrop.");
      toast.error("Airdrop failed");
    } finally {
      setLoading(false);
    }
  };

  const sendTokens = async (recipient: string, amount: number, pin: string) => {
    setLoading(true);
    setError(null);
    try {
      const mnemonic = decryptMnemonic(encryptedMnemonic, pin);

      await sendTransaction(mnemonic, recipient, amount);
      fetchBalance();
      toast.success("Transaction successful");
      return true;
    } catch (err) {
      console.error("Error sending tokens:", err);
      setError("Failed to send tokens.");
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const getWalletTransactions = async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      const transactions = await getTransactions(publicKey);
      const formattedTransactions = parseTransactions(transactions, publicKey);
      return formattedTransactions;
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  return { fetchBalance, getAirdrop, sendTokens, getWalletTransactions, balance, loading, error };
};

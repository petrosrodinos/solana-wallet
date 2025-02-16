import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC_PROVIDER } from "../constants";

export const getBalance = async (publicKey: string) => {
  const connection = new Connection(SOLANA_RPC_PROVIDER);
  const walletPublicKey = new PublicKey(publicKey);
  const balanceLamports = await connection.getBalance(walletPublicKey);
  const balanceSOL = balanceLamports / 1e9;
  return balanceSOL;
};

export const requestAirdrop = async (publicKey: string, amount: number = 1) => {
  try {
    const connection = new Connection(SOLANA_RPC_PROVIDER);
    const walletPublicKey = new PublicKey(publicKey);
    const airdropAmount = amount * LAMPORTS_PER_SOL;
    const airdropSignature = await connection.requestAirdrop(walletPublicKey, airdropAmount);

    await connection.confirmTransaction(airdropSignature);

    return airdropSignature;
  } catch (error) {
    console.error("Error during airdrop:", error);
  }
};

import { Connection, PublicKey } from "@solana/web3.js";
import { SOLANA_RPC_PROVIDER } from "../constants";

export const getBalance = async (publicKey: string) => {
  const connection = new Connection(SOLANA_RPC_PROVIDER);
  const walletPublicKey = new PublicKey(publicKey);
  const balanceLamports = await connection.getBalance(walletPublicKey);
  const balanceSOL = balanceLamports / 1e9;
  return balanceSOL;
};

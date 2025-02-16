import { SOLANA_RPC_PROVIDER } from "../constants";
import * as bip39 from "bip39";
import {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { Buffer } from "buffer";

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

export const sendTransaction = async (mnemonic: string, recipient: string, amount: number) => {
  try {
    window.Buffer = Buffer;

    const recipientPublicKey = new PublicKey(recipient);

    const lamports = amount * LAMPORTS_PER_SOL;

    const seed = bip39.mnemonicToSeedSync(mnemonic);

    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const connection = new Connection(SOLANA_RPC_PROVIDER, "confirmed");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports,
      })
    );

    const signature = await connection.sendTransaction(transaction, [keypair], {
      skipPreflight: false,
      preflightCommitment: "confirmed",
    });

    const confirmation = await connection.confirmTransaction(signature, "confirmed");
    if (confirmation.value.err) {
      console.error("Transaction failed:", confirmation.value.err);
      throw new Error("Transaction failed");
    }

    console.log("Transaction successful. Signature:", signature);
    return signature;
  } catch (error) {
    console.error("Error sending tokens:", error);
    throw error;
  }
};

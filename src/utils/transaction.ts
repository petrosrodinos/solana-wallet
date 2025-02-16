import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Transaction } from "../interfaces/transaction";
import { formatDate } from "./date";

export const parseTransactions = (txs: any[], userPublicKey: string): Transaction[] => {
  return txs
    .map((tx) => {
      const signature = tx.transaction.signatures[0];
      const blockTime = tx.blockTime;
      const date = blockTime ? new Date(blockTime * 1000).toISOString() : "";

      const transferInstruction = tx.transaction.message.instructions.find(
        (inst: any) => inst.parsed?.type === "transfer"
      );

      if (!transferInstruction) return null;

      const { source, destination, lamports } = transferInstruction.parsed.info;

      return {
        id: signature,
        type: source === userPublicKey ? "send" : "receive",
        amount: lamports / LAMPORTS_PER_SOL,
        date: formatDate(date),
        from: source,
        to: destination,
      };
    })
    .filter((tx) => tx !== null) as Transaction[];
};

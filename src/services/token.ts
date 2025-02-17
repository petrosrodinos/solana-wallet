import { Keypair, Connection } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import * as bip39 from "bip39";
import { SOLANA_RPC_PROVIDER, TOKEN_DECIMALS } from "../constants";
// import { createCreateMetadataAccountV3Instruction, DataV2 } from "@metaplex-foundation/mpl-token-metadata";

export const createAndMintToken = async (mnemonic: string, quantity: string) => {
  try {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    const connection = new Connection(SOLANA_RPC_PROVIDER, "confirmed");
    const payer = keypair;

    console.log("Creating new token mint...");
    const mint = await createMint(connection, payer, payer.publicKey, null, TOKEN_DECIMALS);

    console.log("Creating associated token account...");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );

    console.log("Minting tokens...");
    const mintAmount = Number(quantity) * 10 ** TOKEN_DECIMALS;
    await mintTo(connection, payer, mint, tokenAccount.address, payer, mintAmount);

    console.log(`Successfully minted ${quantity} tokens! Mint Address: ${mint.toBase58()}`);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error during token creation and minting");
  }
};

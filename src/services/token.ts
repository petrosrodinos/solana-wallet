import {
  Keypair,
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  getTokenMetadata,
} from "@solana/spl-token";
import {
  createInitializeInstruction,
  createUpdateFieldInstruction,
  pack,
  TokenMetadata,
} from "@solana/spl-token-metadata";
import * as bip39 from "bip39";
import { SOLANA_RPC_PROVIDER, TOKEN_DECIMALS } from "../constants";

export const createAndMintToken = async (
  mnemonic: string,
  quantity: string,
  tokenName: string,
  tokenSymbol: string,
  tokenUri: string
) => {
  try {
    // Create keypair from mnemonic
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    const connection = new Connection(SOLANA_RPC_PROVIDER, "confirmed");
    const payer = keypair;

    // Generate new keypair for Mint Account
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    const decimals = TOKEN_DECIMALS;
    const mintAuthority = payer.publicKey;
    const updateAuthority = payer.publicKey;

    // Metadata to store in Mint Account
    const metaData: TokenMetadata = {
      updateAuthority: updateAuthority,
      mint: mint,
      name: tokenName,
      symbol: tokenSymbol,
      uri: tokenUri,
      additionalMetadata: [["description", "Token created with SPL Token Extensions"]],
    };

    // Size of MetadataExtension and metadata
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    const metadataLen = pack(metaData).length;

    // Size of Mint Account with extension
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    // Minimum lamports required for Mint Account
    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataExtension + metadataLen
    );

    // Instructions for creating and initializing mint with metadata
    const createAccountInstruction = SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      space: mintLen,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    });

    const initializeMetadataPointerInstruction = createInitializeMetadataPointerInstruction(
      mint,
      updateAuthority,
      mint,
      TOKEN_2022_PROGRAM_ID
    );

    const initializeMintInstruction = createInitializeMintInstruction(
      mint,
      decimals,
      mintAuthority,
      null,
      TOKEN_2022_PROGRAM_ID
    );

    const initializeMetadataInstruction = createInitializeInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: updateAuthority,
      mint: mint,
      mintAuthority: mintAuthority,
      name: metaData.name,
      symbol: metaData.symbol,
      uri: metaData.uri,
    });

    const updateFieldInstruction = createUpdateFieldInstruction({
      programId: TOKEN_2022_PROGRAM_ID,
      metadata: mint,
      updateAuthority: updateAuthority,
      field: metaData.additionalMetadata[0][0],
      value: metaData.additionalMetadata[0][1],
    });

    // Create and send transaction to initialize mint with metadata
    const transaction = new Transaction().add(
      createAccountInstruction,
      initializeMetadataPointerInstruction,
      initializeMintInstruction,
      initializeMetadataInstruction,
      updateFieldInstruction
    );

    console.log("Creating new token mint with metadata...");
    const mintTxSignature = await sendAndConfirmTransaction(connection, transaction, [
      payer,
      mintKeypair,
    ]);
    console.log(`Mint created: ${mint.toBase58()}`);
    console.log(`Transaction signature: ${mintTxSignature}`);

    // Create token account and mint tokens
    console.log("Creating associated token account...");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey,
      false,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    console.log("Minting tokens...");
    const mintAmount = Number(quantity) * 10 ** decimals;
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer,
      mintAmount,
      [],
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    const chainMetadata = await getTokenMetadata(connection, mint);
    console.log(`Successfully minted ${quantity} tokens with metadata!`);
    console.log(`Mint Address: ${mint.toBase58()}`);
    console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
    console.log("Chain Metadata:", chainMetadata);

    return {
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      transactionSignature: mintTxSignature,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error during token creation and minting with metadata");
  }
};

export const uploadFileToIpfs = async (file: File) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `https://example.com/uploads/${file.name}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

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
import { MORALIS_API_KEY, SOLANA_NETWORK, SOLANA_RPC_PROVIDER, TOKEN_DECIMALS } from "../constants";
import { Token } from "../interfaces/token";
import { initMoralis } from "../utils/moralis";
import Moralis from "moralis";

export const createAndMintToken = async (
  mnemonic: string,
  quantity: string,
  tokenName: string,
  tokenSymbol: string,
  tokenUri: string
  // price: string = "0"
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

    const mintTxSignature = await sendAndConfirmTransaction(connection, transaction, [
      payer,
      mintKeypair,
    ]);

    // Create token account and mint tokens
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
    console.log(`Transaction signature: ${mintTxSignature}`);
    console.log("Chain Metadata:", chainMetadata);

    return {
      mintAddress: mint.toBase58(),
      tokenAccount: tokenAccount.address.toBase58(),
      transactionSignature: mintTxSignature,
      metadata: chainMetadata,
      decimals: decimals,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error during token creation and minting with metadata");
  }
};

export const getUserTokens = async (publicKey: string): Promise<Token[]> => {
  try {
    await initMoralis();

    const portfolioResponse: any = await Moralis.SolApi.account.getPortfolio({
      network: SOLANA_NETWORK,
      address: publicKey,
    });

    const tokens = portfolioResponse.jsonResponse.tokens || [];

    const userTokens: Token[] = await Promise.all(
      tokens.map(async (token: any) => {
        const metadata: any = await getMetadata(token.mint);

        return {
          name: metadata?.name || token.name || "",
          symbol: metadata?.symbol || token.symbol || "",
          metadata: metadata || {},
          mint: token.mint,
          balance: token.amount,
          decimals: token.decimals.toString(),
          description: metadata?.description || "",
          image: metadata?.image || "",
          totalSupply: metadata?.totalSupply || "",
          associatedTokenAddress: token.associatedTokenAddress,
        };
      })
    );

    console.log("User tokens:", userTokens);

    return userTokens;
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    return [];
  }
};

const getMetadata = async (mintAddress: string) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": MORALIS_API_KEY,
      },
    };

    let metadata = await fetch(
      `https://solana-gateway.moralis.io/token/${SOLANA_NETWORK}/${mintAddress}/metadata`,
      options
    );
    metadata = await metadata.json();

    return metadata;
  } catch (error) {
    throw new Error("Error fetching token metadata");
  }
};

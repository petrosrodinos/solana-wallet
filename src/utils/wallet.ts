import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import AES from "crypto-js/aes";

export const createWallet = () => {
  try {
    const mnemonic = bip39.generateMnemonic();

    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);

    const keypair = Keypair.fromSeed(seed);
    const publicKey = keypair.publicKey.toString();

    const pin = "1234";

    const encryptedMnemonic = AES.encrypt(mnemonic, pin).toString();

    return {
      publicKey,
      mnemonic,
      encryptedMnemonic,
    };
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

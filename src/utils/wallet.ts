import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import AES from "crypto-js/aes";
import { Buffer } from "buffer";

export const createWallet = (pin: string) => {
  window.Buffer = Buffer;

  try {
    const mnemonic = bip39.generateMnemonic();

    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);

    const keypair = Keypair.fromSeed(seed);
    const publicKey = keypair.publicKey.toString();

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

export const decryptMnemonic = (encryptedMnemonic: string, pin: string) => {
  try {
    const bytes = AES.decrypt(encryptedMnemonic, pin);
    const mnemonic = bytes.toString();

    return mnemonic;
  } catch (error) {
    console.error("Error decrypting mnemonic:", error);
    throw error;
  }
};

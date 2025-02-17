import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import AES from "crypto-js/aes";
import { Buffer } from "buffer";
import { enc, PBKDF2 } from "crypto-js";

export const createWallet = (pin: string) => {
  window.Buffer = Buffer;

  try {
    const mnemonic = bip39.generateMnemonic();

    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0, 32);

    const keypair = Keypair.fromSeed(seed);
    const publicKey = keypair.publicKey.toString();

    const encryptedMnemonic = encryptMnemonic(mnemonic, pin);

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

export const importWallet = (mnemonic: string, pin: string) => {
  window.Buffer = Buffer;

  try {
    const trimmedMnemonic = mnemonic.trim().replace(/\s+/g, " ");

    // if (!bip39.validateMnemonic(trimmedMnemonic)) {
    //   throw new Error("Invalid mnemonic.");
    // }

    const seed = bip39.mnemonicToSeedSync(trimmedMnemonic).slice(0, 32);

    const keypair = Keypair.fromSeed(seed);
    const publicKey = keypair.publicKey.toString();

    const encryptedMnemonic = encryptMnemonic(mnemonic, pin);

    return {
      publicKey,
      encryptedMnemonic,
    };
  } catch (error) {
    console.error("Error importing wallet:", error);
    throw error;
  }
};

export const decryptMnemonic = (encryptedMnemonic: string, pin: string) => {
  try {
    const key = PBKDF2(pin, "salt", { keySize: 256 / 32, iterations: 1000 }).toString();

    const bytes = AES.decrypt(encryptedMnemonic, key);
    const mnemonic = bytes.toString(enc.Utf8);

    return mnemonic;
  } catch (error) {
    console.error("Error decrypting mnemonic:", error);
    throw error;
  }
};

export const encryptMnemonic = (mnemonic: string, pin: string) => {
  const key = PBKDF2(pin, "salt", { keySize: 256 / 32, iterations: 1000 }).toString();

  let encryptedMnemonic = AES.encrypt(mnemonic, key).toString();

  return encryptedMnemonic;
};

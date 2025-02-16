export interface WalletStore {
  mnemonic: string;
  publicKey: string;
  encryptedMnemonic: string;
  setWallet: (state: NewWallet) => void;
  resetWallet: () => void;
}

export interface NewWallet {
  encryptedMnemonic: string;
  publicKey: string;
  mnemonic: string;
}

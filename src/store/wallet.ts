import { create } from "zustand";
import { NewWallet, WalletStore } from "../interfaces/wallet";
import { devtools, persist } from "zustand/middleware";

const initialValues: NewWallet = {
  mnemonic: "",
  publicKey: "",
  encryptedMnemonic: "",
};

const STORE_KEY = "wallet-storage";

export const useWallet = create<WalletStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialValues,
        setWallet: (wallet: NewWallet) => set((state) => ({ ...state, ...wallet })),
        resetWallet: () => set(initialValues),
      }),
      {
        name: STORE_KEY,
      }
    )
  )
);

export const getWalletState = () => useWallet.getState();

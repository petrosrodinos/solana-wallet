import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PinStore } from "../interfaces/pin";

const STORE_KEY = "pin-storage";

export const usePinStore = create<PinStore>()(
  persist(
    (set) => ({
      hashedPin: null,
      setHashedPin: (hashedPin) => set({ hashedPin }),
      resetPin: () => set({ hashedPin: null }),
    }),
    {
      name: STORE_KEY,
    }
  )
);

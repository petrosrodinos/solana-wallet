import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PinStore } from "../interfaces/pin";

const STORE_KEY = "pin-storage";

export const usePinStore = create<PinStore>()(
  persist(
    devtools((set) => ({
      hashedPin: null,
      setHashedPin: (hashedPin: string) => set({ hashedPin }),
      resetPin: () => set({ hashedPin: null }),
    })),
    {
      name: STORE_KEY,
    }
  )
);

export interface PinStore {
  hashedPin: string | null;
  setHashedPin: (hashedPin: string) => void;
  resetPin: () => void;
}

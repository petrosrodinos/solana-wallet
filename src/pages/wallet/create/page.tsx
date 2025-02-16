import { createWallet } from "../../../utils/wallet";
import { useWalletStore } from "../../../store/wallet";
import { WalletStore } from "../../../interfaces/wallet";
import PinGenerator from "../../../components/Pin";
import usePin from "../../../hooks/usePin";
import { useEffect } from "react";
import MnemonicDisplay from "../../../components/MnemonicDisplay";

const CreateWallet = () => {
  const { setWallet } = useWalletStore((state: WalletStore) => state);
  const { pinSet, pin } = usePin();

  useEffect(() => {
    if (pinSet) {
      handleCreateWallet();
    }
  }, [pinSet]);

  const handleCreateWallet = () => {
    const { encryptedMnemonic, publicKey, mnemonic } = createWallet(pin);
    setWallet({ encryptedMnemonic, publicKey, mnemonic });
  };

  return (
    <div>
      {!pinSet && <PinGenerator />}
      {pinSet && <MnemonicDisplay />}
    </div>
  );
};

export default CreateWallet;

import { createWallet } from "../../../utils/wallet";
import { useWalletStore } from "../../../store/wallet";
import { WalletStore } from "../../../interfaces/wallet";
import PinGenerator from "../../../components/Pin";
import usePin from "../../../hooks/usePin";
import MnemonicDisplay from "../../../components/MnemonicDisplay";

const CreateWallet = () => {
  const { setWallet } = useWalletStore((state: WalletStore) => state);
  const { pinSet } = usePin();

  const handleSetPin = (pin: string) => {
    const { encryptedMnemonic, publicKey, mnemonic } = createWallet(pin);
    setWallet({ encryptedMnemonic, publicKey, mnemonic });
  };

  return (
    <div>
      {!pinSet && <PinGenerator onSetPin={handleSetPin} />}
      {pinSet && <MnemonicDisplay />}
    </div>
  );
};

export default CreateWallet;

import { importWallet } from "../../../utils/wallet";
import { useWalletStore } from "../../../store/wallet";
import { WalletStore } from "../../../interfaces/wallet";
import PinGenerator from "../../../components/Pin";
import usePin from "../../../hooks/usePin";
import ImportMnemonic from "../../../components/ImportMnemonic";
import { useNavigate } from "react-router";
import { useState } from "react";

const ImportWallet = () => {
  const { setWallet } = useWalletStore((state: WalletStore) => state);
  const { pinSet } = usePin();
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>("");

  const handleImportMnemonic = (mnemonic: string) => {
    const { encryptedMnemonic, publicKey } = importWallet(mnemonic, pin);
    setWallet({ encryptedMnemonic, publicKey, mnemonic: "" });
    navigate("/");
  };

  const handleSetPin = (pin: string) => {
    setPin(pin);
  };

  return (
    <div>
      {!pinSet && <PinGenerator onSetPin={handleSetPin} />}
      {pinSet && <ImportMnemonic onImport={handleImportMnemonic} />}
    </div>
  );
};

export default ImportWallet;

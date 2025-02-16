import { importWallet } from "../../../utils/wallet";
import { useWalletStore } from "../../../store/wallet";
import { WalletStore } from "../../../interfaces/wallet";
import PinGenerator from "../../../components/Pin";
import usePin from "../../../hooks/usePin";
import ImportMnemonic from "../../../components/ImportMnemonic";
import { useNavigate } from "react-router";

const ImportWallet = () => {
  const { setWallet } = useWalletStore((state: WalletStore) => state);
  const { pinSet, pin } = usePin();
  const navigate = useNavigate();

  const handleImportMnemonic = (mnemonic: string) => {
    const { encryptedMnemonic, publicKey } = importWallet(mnemonic, pin);
    setWallet({ encryptedMnemonic, publicKey, mnemonic: "" });
    navigate("/");
  };

  return (
    <div>
      {!pinSet && <PinGenerator />}
      {pinSet && <ImportMnemonic onImport={handleImportMnemonic} />}
    </div>
  );
};

export default ImportWallet;

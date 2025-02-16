import { createWallet } from "../../../utils/wallet";
import { useWallet } from "../../../store/wallet";
import { WalletStore } from "../../../interfaces/wallet";
const CreateWallet = () => {
  const { setWallet } = useWallet((state: WalletStore) => state);

  const handleCreateWallet = () => {
    const { encryptedMnemonic, publicKey, mnemonic } = createWallet();
    setWallet({ encryptedMnemonic, publicKey, mnemonic });
  };

  return <div>create</div>;
};

export default CreateWallet;

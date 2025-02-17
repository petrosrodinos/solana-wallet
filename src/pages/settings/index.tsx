import PinInput from "../../components/Pin";
import usePin from "../../hooks/usePin";
import { useWalletStore } from "../../store/wallet";
import { useState } from "react";
import { decryptMnemonic } from "../../utils/wallet";
import ShowMnemonic from "./ShowMnemonic";

const Settings = () => {
  const { visible, togglePinPrompt } = usePin();
  const { encryptedMnemonic } = useWalletStore();
  const [mnemonic, setMnemonic] = useState<string>("");

  function handleCorrectPin(pin: string) {
    togglePinPrompt();
    const decryptedMnemonic = decryptMnemonic(encryptedMnemonic, pin);
    setMnemonic(decryptedMnemonic);
    console.log("Decrypted Mnemonic: ", decryptedMnemonic);
    console.log("encryptedMnemonic: ", encryptedMnemonic);
    console.log("pin: ", pin);
  }

  return (
    <>
      {!visible && (
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <button
            onClick={togglePinPrompt}
            className="px-4 py-2 border border-red-500 text-red-300 rounded-lg hover:bg-red-700 transition"
          >
            Reveal Mnemonic
          </button>
        </div>
      )}
      {visible && <PinInput confirm={true} onConfirm={handleCorrectPin} />}
      {mnemonic && <ShowMnemonic mnemonic={mnemonic} />}
    </>
  );
};

export default Settings;

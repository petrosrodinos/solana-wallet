import { FC } from "react";

interface MnemonicDisplayProps {
  mnemonic: string;
}

const MnemonicDisplay: FC<MnemonicDisplayProps> = ({ mnemonic }) => {
  return (
    <div className="mt-6">
      <div className="p-4 bg-gray-200 text-gray-800 rounded-md break-all">{mnemonic}</div>
    </div>
  );
};

export default MnemonicDisplay;

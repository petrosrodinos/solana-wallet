import { useState, FC } from "react";

interface ImportMnemonicProps {
  onImport: (mnemonic: string) => void;
}

const ImportMnemonic: FC<ImportMnemonicProps> = ({ onImport }) => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(new Array(12).fill(""));
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newMnemonicWords = [...mnemonicWords];
    newMnemonicWords[index] = e.target.value;
    setMnemonicWords(newMnemonicWords);
    setError("");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("Text");
    const words = pastedText.split(" ").map((word) => word.trim());

    if (words.length === 12) {
      setMnemonicWords(words);
      setError("");
    } else {
      setError("Invalid mnemonic. Please paste all 12 words.");
    }

    e.preventDefault();
  };

  const handleSubmit = () => {
    const mnemonic = mnemonicWords.join(" ").trim();
    if (mnemonic.split(" ").length === 12) {
      onImport(mnemonic);
    } else {
      setError("Please enter all 12 words.");
    }
  };

  const handleClear = () => {
    setMnemonicWords(new Array(12).fill(""));
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Import Your Mnemonic</h2>
        <p className="text-gray-600 mb-6">
          Please enter your 12-word mnemonic phrase to import your wallet.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {mnemonicWords.map((word, index) => (
            <input
              key={index}
              type="text"
              value={word}
              onChange={(e) => handleChange(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Word ${index + 1}`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex flex-col gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Import Mnemonic
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportMnemonic;

import { useState, useEffect, FC } from "react";
import { Delete } from "lucide-react";
import usePin from "../../hooks/usePin";

interface PinInputProps {
  confirm?: boolean;
  onConfirm?: (pin: string) => void;
}

const PinInput: FC<PinInputProps> = ({ confirm = false, onConfirm }) => {
  const { checkPin, encryptPin, handlePinChange, pinError } = usePin(onConfirm);
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    handlePinChange(pin);
  }, [pin]);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
      setError("");
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      if (confirm) {
        checkPin(pin);
      } else {
        encryptPin(pin);
      }
      setError("");
      setPin("");
    } else {
      setError("PIN must be 4 digits");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-xs border border-white/20">
        <h2 className="text-xl font-semibold text-center text-white mb-6">
          {confirm ? "Confirm Your PIN" : "Set Your PIN"}
        </h2>

        <div className="flex justify-center space-x-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full transition-all ${
                i < pin.length ? "bg-blue-500" : "bg-gray-500/50 border border-white/20"
              }`}
            ></div>
          ))}
        </div>

        {(error || pinError) && (
          <p className="text-red-400 text-sm text-center mb-3">{error || pinError}</p>
        )}

        <div className="grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberClick((i + 1).toString())}
              className="w-16 h-16 text-2xl font-bold text-white bg-gray-700/50 rounded-xl shadow-md backdrop-blur-lg hover:bg-gray-600 transition-all"
            >
              {i + 1}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleNumberClick("0")}
            className="w-16 h-16 text-2xl font-bold text-white bg-gray-700/50 rounded-xl shadow-md backdrop-blur-lg hover:bg-gray-600 transition-all"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-16 h-16 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition flex items-center justify-center"
          >
            <Delete size={28} />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Confirm PIN
        </button>
      </div>
    </div>
  );
};

export default PinInput;

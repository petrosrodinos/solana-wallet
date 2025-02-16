import { useState } from "react";
import { usePinStore } from "../../store/pin";
import { Delete } from "lucide-react";

const PinGenerator = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { setHashedPin } = usePinStore();

  // Hash PIN using SHA-256
  const hashPin = async (pin: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // Handle PIN entry via numpad
  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  // Handle backspace
  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  // Submit PIN
  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    const hashed = await hashPin(pin);
    setHashedPin(hashed);
    setPin("");
    alert("PIN set successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Set Your PIN</h2>

        {/* Hidden input field */}
        <input type="password" className="hidden" value={pin} readOnly />

        {/* PIN Display */}
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full ${
                i < pin.length ? "bg-blue-500" : "bg-gray-300"
              } transition-all`}
            ></div>
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberClick((i + 1).toString())}
              className="w-16 h-16 text-2xl font-bold bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
            >
              {i + 1}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleNumberClick("0")}
            className="w-16 h-16 text-2xl font-bold bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-16 h-16 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition flex items-center justify-center"
          >
            <Delete size={24} />
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm PIN
        </button>
      </div>
    </div>
  );
};

export default PinGenerator;

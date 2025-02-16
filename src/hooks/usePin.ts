import { useState, useMemo } from "react";
import { comparePin, hashPin } from "../utils/pin";
import { usePinStore } from "../store/pin";

const usePin = (onCorrectPin?: (pin: string) => void) => {
  const { setHashedPin, hashedPin } = usePinStore();
  const [pin, setPin] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  const checkPin = async (enteredPin: string) => {
    try {
      const isMatch = await comparePin(enteredPin, hashedPin as string);
      setIsCorrect(isMatch);
      setPinError(isMatch ? null : "Incorrect PIN");
      setVisible(!isMatch);
      if (isMatch && onCorrectPin) onCorrectPin(pin);
    } catch (err) {
      setPinError("An error occurred while verifying the PIN.");
    }
  };

  const encryptPin = async (pin: string) => {
    try {
      const hashedPin = await hashPin(pin);
      setHashedPin(hashedPin);
      return hashedPin;
    } catch (err) {
      setPinError("An error occurred while encrypting the PIN.");
    }
  };

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const togglePinPrompt = () => {
    setVisible((prev) => !prev);
  };

  const pinSet = useMemo(() => hashedPin !== null, [hashedPin]);

  return {
    isCorrect,
    visible,
    pinSet,
    pin,
    pinError,
    handlePinChange,
    checkPin,
    encryptPin,
    togglePinPrompt,
  };
};

export default usePin;

import { useState, useMemo } from "react";
import { comparePin, hashPin } from "../utils/pin";
import { usePinStore } from "../store/pin";

const usePin = (storedHashedPin: string) => {
  const { setHashedPin, hashedPin } = usePinStore();
  const [pin, setPin] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  const checkPin = async (enteredPin: string) => {
    try {
      const isMatch = await comparePin(enteredPin, storedHashedPin);
      setIsCorrect(isMatch);
      setPinError(isMatch ? null : "Incorrect PIN");
      setVisible(false);
      return isMatch;
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

  const toggleVisibility = () => {
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
    toggleVisibility,
  };
};

export default usePin;

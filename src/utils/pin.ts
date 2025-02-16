import bcrypt from "bcryptjs";

export const hashPin = async (pin: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPin = await bcrypt.hash(pin, saltRounds);
  return hashedPin;
};

export const comparePin = async (pin: string, hashedPin: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(pin, hashedPin);
  return isMatch;
};

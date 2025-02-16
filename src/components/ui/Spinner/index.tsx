import { FC } from "react";

interface SpinnerProps {
  visible: boolean;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ visible, className }) => {
  if (!visible) return null;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

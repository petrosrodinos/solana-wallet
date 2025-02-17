import { FC } from "react";
import { ToastContainer } from "react-toastify";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-1">
      <div className="max-w-2xl mx-auto p-1 mt-17">{children}</div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Container;

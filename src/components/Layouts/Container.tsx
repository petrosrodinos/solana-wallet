import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-1">
      <div className="max-w-2xl mx-auto p-1">{children}</div>
    </div>
  );
};

export default Container;

import React from "react";
import UserTokens from "../../components/Tokens/UserTokens";
import AvailableTokens from "../../components/Tokens/AvailableTokens";

const Tokens: React.FC = () => {
  return (
    <div className="w-full">
      <UserTokens />
      <AvailableTokens />
    </div>
  );
};

export default Tokens;

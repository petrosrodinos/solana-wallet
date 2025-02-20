import React, { useEffect, useState } from "react";
import AvailableTokenCard from "./AvailableTokenCard";
import { useToken } from "../../../hooks/useToken";
import { Token } from "../../../interfaces/token";
import Spinner from "../../ui/Spinner";
import Alert from "../../ui/Alert";

const AvailableTokens: React.FC = () => {
  const { getAllTokens, loading } = useToken();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getTokens = async () => {
      const tokens: any = await getAllTokens();
      setTokens(tokens);
      console.log("TOK", JSON.stringify(tokens[0]));
    };
    getTokens();
  }, []);

  const handleBuyToken = (tokenName: Token) => {
    console.log(`Buying ${tokenName}...`);
  };

  return (
    <div className="w-full mt-5">
      <h3 className="text-xl font-semibold text-white mb-4">Available Tokens</h3>
      {!loading && (
        <div className="bg-white/10 rounded-xl shadow-lg backdrop-blur-md p-4 space-y-4">
          {tokens.map((token, index) => (
            <AvailableTokenCard key={index} token={token} onBuy={handleBuyToken} />
          ))}
        </div>
      )}
      <Spinner visible={loading} />

      <Alert
        visible={tokens.length == 0 && !loading}
        text="No tokens found,buy some from the list below"
        variant="warning"
      />
    </div>
  );
};

export default AvailableTokens;

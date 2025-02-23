import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import UserTokenCard from "./UserTokenCard";
import { useToken } from "../../../hooks/useToken";
import Spinner from "../../ui/Spinner";
import { Token } from "../../../interfaces/token";
import Alert from "../../ui/Alert";

const UserTokens: React.FC = () => {
  const { getUsersTokens, loading } = useToken();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getUserToken = async () => {
      const tokens: any = await getUsersTokens();
      setTokens(tokens);
    };
    getUserToken();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">My Tokens</h3>
        <Link
          to="/tokens/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Create a Token
        </Link>
      </div>
      <Spinner visible={loading} />
      {!loading && tokens.length > 0 && (
        <div className="bg-white/10 rounded-xl shadow-lg backdrop-blur-md p-4 space-y-4">
          {tokens.map((token, index) => (
            <UserTokenCard key={index} token={token} />
          ))}
        </div>
      )}
      <Alert
        visible={tokens.length == 0 && !loading}
        text="No tokens found,buy some from the list below"
        variant="warning"
      />
    </div>
  );
};

export default UserTokens;

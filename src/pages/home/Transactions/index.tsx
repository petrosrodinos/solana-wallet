import { FC, useEffect, useState } from "react";
import { Transaction } from "../../../interfaces/transaction";
import { useWallet } from "../../../hooks/useWallet";
import Spinner from "../../../components/ui/Spinner";
import Alert from "../../../components/ui/Alert";

const Transactions: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { getWalletTransactions, error, loading } = useWallet();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const transactions: any = await getWalletTransactions();
    setTransactions(transactions);
  };

  return (
    <div className="w-full max-w-lg mt-8">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <Spinner visible={loading} />
      {!loading && (
        <div className="bg-white/10 rounded-xl shadow-lg backdrop-blur-md p-4 space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center">No transactions found.</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  tx.type === "send" ? "border-red-500" : "border-green-500"
                }`}
              >
                <div>
                  <p className="text-sm text-gray-300">{tx.date}</p>
                  <p className="text-xs break-all">
                    {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`}
                  </p>
                </div>
                <p
                  className={`text-lg font-semibold ${
                    tx.type === "send" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {tx.type === "send" ? "-" : "+"}
                  {tx.amount} SOL
                </p>
              </div>
            ))
          )}
        </div>
      )}
      <Alert text={error} variant="error" />
    </div>
  );
};

export default Transactions;

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import CreateWallet from "./pages/wallet/create/page";
import ImportWallet from "./pages/wallet/import/page";
import Home from "./pages/home";
import Wallet from "./pages/wallet/wallet";
import { useWalletStore } from "./store/wallet";
import { ToastContainer } from "react-toastify";
import Tokens from "./pages/tokens";
import Nfts from "./pages/nfts";

function App() {
  const { encryptedMnemonic } = useWalletStore((state) => state);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-1">
        <div className="max-w-2xl mx-auto p-1">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={!encryptedMnemonic ? <Navigate to="/wallet" /> : <Home />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wallet/create" element={<CreateWallet />} />
              <Route path="/wallet/import" element={<ImportWallet />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/nfts" element={<Nfts />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer position="top-center" />
        </div>
      </div>
    </>
  );
}

export default App;

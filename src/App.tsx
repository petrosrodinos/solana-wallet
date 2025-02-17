import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router";
import { useWalletStore } from "./store/wallet";
import Nfts from "./pages/nfts";
import Tokens from "./pages/tokens";
import CreateWallet from "./pages/wallet/create/page";
import ImportWallet from "./pages/wallet/import/page";
import MainLayout from "./components/Layouts/MainLayout";
import Home from "./pages/home";
import Wallet from "./pages/wallet/wallet";
import Settings from "./pages/settings";
import Container from "./components/Layouts/Container";

function App() {
  const { encryptedMnemonic } = useWalletStore((state) => state);

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={!encryptedMnemonic ? <Navigate to="/wallet" /> : <Home />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="nfts" element={<Nfts />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/wallet" element={<Outlet />}>
            <Route index element={<Wallet />} />
            <Route path="create" element={<CreateWallet />} />
            <Route path="import" element={<ImportWallet />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

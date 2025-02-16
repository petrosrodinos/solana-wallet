import { BrowserRouter, Route, Routes } from "react-router";
import CreateWallet from "./pages/wallet/create/page";
import ImportWallet from "./pages/wallet/import/page";
import Home from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet/create" element={<CreateWallet />} />
          <Route path="/wallet/import" element={<ImportWallet />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

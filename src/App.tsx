import { BrowserRouter, Route, Routes } from "react-router";
import CreateWallet from "./pages/wallet/create/page";
import ImportWallet from "./pages/wallet/import/page";
import Home from "./pages/home";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
        <div className="max-w-4xl mx-auto p-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wallet/create" element={<CreateWallet />} />
              <Route path="/wallet/import" element={<ImportWallet />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;

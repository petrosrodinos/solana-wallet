import { LogOut } from "lucide-react";
import { useWalletStore } from "../../store/wallet";
import { usePinStore } from "../../store/pin";
import { useNavigate } from "react-router";

const AppBar = () => {
  const { resetWallet } = useWalletStore();
  const { resetPin } = usePinStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    resetWallet();
    resetPin();
    navigate("/");
  };

  return (
    <nav className="mx-auto max-w-2xl z-1000 fixed left-0 right-0 top-0 bg-gray-800 p-4 flex justify-between items-center mb-2">
      <div className="text-white text-xl font-semibold">SOL Wallet</div>
      <button onClick={handleLogout} className="text-white hover:text-gray-400" aria-label="Logout">
        <LogOut size={24} />
      </button>
    </nav>
  );
};

export default AppBar;

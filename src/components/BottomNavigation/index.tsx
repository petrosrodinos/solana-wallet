import { useLocation, useNavigate } from "react-router";
import { Home, Wallet, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  const tabs = [
    { label: "Home", path: "/", icon: Home },
    { label: "Tokens", path: "/tokens", icon: Wallet },
    { label: "NFTs", path: "/nfts", icon: Wallet },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <nav className="max-w-2xl bg-gray-800 p-4 flex justify-around fixed bottom-0 left-0 right-0 mx-auto w-full">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center text-sm ${
              isActive ? "text-white" : "text-gray-400"
            }`}
          >
            <Icon size={24} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;

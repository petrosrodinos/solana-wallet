import { useLocation, useNavigate } from "react-router";
import { Wallet, Settings, Coins, Component } from "lucide-react";
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
    { label: "Home", path: "/", icon: Wallet },
    { label: "Tokens", path: "/tokens", icon: Coins },
    { label: "NFTs", path: "/nfts", icon: Component },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <nav className="mb-15">
      <div className="max-w-2xl mt-1 bg-gray-800 p-2 flex justify-around fixed bottom-0 left-0 right-0 mx-auto">
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
      </div>
    </nav>
  );
};

export default BottomNavigation;

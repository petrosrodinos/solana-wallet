import { Outlet } from "react-router";
import BottomNavigation from "../Navigation/BottomNavigation";
import AppBar from "../Navigation/AppBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;

import { Outlet } from "react-router";
import AppBar from "../AppBar";
import BottomNavigation from "../BottomNavigation";

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

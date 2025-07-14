import { Outlet } from "react-router-dom";
import SideBar from "@renderer/components/SideBar";
import Header from "@renderer/components/Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

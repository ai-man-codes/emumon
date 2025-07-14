import { Outlet } from "react-router-dom";
import SideBar from "@renderer/components/SideBar";
import Header from "@renderer/components/Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="relative flex-1 flex flex-col overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 object-cover w-full h-full z-0"
        >
          <source src={new URL('../assets/videos/bg-small.mp4', import.meta.url).href} type="video/mp4" />
          
        </video>

        {/* Semi-transparent dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10" />

        {/* Foreground content: header + routed pages */}
        <div className="relative z-20 flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

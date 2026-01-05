import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Body() {
  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Body;

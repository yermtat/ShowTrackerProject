import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import background from "../Assets/background.jpg";

export const authContext = createContext();

export default function MainWindow() {
  const [authState, setAuthState] = useState(false);

  return (
    <div>
      <authContext.Provider value={{ authState, setAuthState }}>
        <header className="fixed z-10 w-full">
          <Navbar />
        </header>

        <main
          className="pt-16 min-h-screen"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full px-4 md:px-16 lg:px-60">
            <div className="border-l border-r border-transparent md:border-gray-300 md:border-solid w-full min-h-screen bg-white/80 backdrop-blur-md">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer></footer>
      </authContext.Provider>
    </div>
  );
}

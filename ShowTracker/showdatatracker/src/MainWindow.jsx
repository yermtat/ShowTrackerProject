import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function MainWindow() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, [authState]);

  return (
    <div>
      <authContext.Provider value={{ authState, setAuthState }}>
        <header>
          <Navbar />
        </header>

        <main>
          <div className="background-bg ">
            <div className="w-screen pl-60 pr-60 flex justify-start">
              <div className="border-l border-r w-screen h-screen">
                {" "}
                <Outlet className="outlet" />
              </div>
            </div>
          </div>
        </main>

        <footer></footer>
      </authContext.Provider>
    </div>
  );
}

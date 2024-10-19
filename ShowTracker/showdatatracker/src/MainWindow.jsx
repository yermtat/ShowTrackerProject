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
          <Outlet className="outlet" />
        </main>

        <footer></footer>
      </authContext.Provider>
    </div>
  );
}

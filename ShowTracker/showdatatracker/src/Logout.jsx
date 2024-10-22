import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./MainWindow";

export default function Logout() {
  const navigate = useNavigate();

  const isAuthorized = useContext(authContext);

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refershTokenExpiry");

    isAuthorized.setAuthState(false);
    navigate("/login");
    window.location.reload();
  }, []);

  return <div>Logout</div>;
}

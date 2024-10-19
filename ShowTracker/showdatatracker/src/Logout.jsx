import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/login");
    window.location.reload();
  }, []);

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
}

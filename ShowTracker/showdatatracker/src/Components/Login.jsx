import React from "react";
import { useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "./MainWindow";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const isAuthorized = useContext(authContext);

  const refUsername = useRef();
  const refPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = refUsername.current.value;
    const password = refPassword.current.value;

    try {
      const fetchedData = await axios.post(
        "https://localhost:7015/api/v1/Auth/Login",
        { username: username, password: password },
        {
          withCredentials: true,
        },
        {
          headers: {
            Accept: "*/*",
            Host: "http://localhost:3000",
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("isAuthorized", true);
      isAuthorized.setAuthState(true);
      navigateTo("/home");
    } catch (error) {
      console.log(error.response.data.error);
      return alert(error.response.data.error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-yellow-100 dark:bg-yellow-700 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-500 dark:text-yellow-300 mb-8">
          Log in
        </h1>
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          <div>
            <input
              id="username"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="username"
              placeholder="Username"
              required
              ref={refUsername}
            />
          </div>
          <div>
            <input
              id="password"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="password"
              placeholder="Password"
              required
              ref={refPassword}
            />
          </div>
          <button
            className="w-full py-3 text-lg font-bold text-black bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 transition-transform transform hover:scale-105"
            type="submit"
          >
            LOG IN
          </button>
        </form>
        <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

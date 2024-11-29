import React from "react";
import { useRef } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const refUsername = useRef();
  const refPassword = useRef();
  const refEmail = useRef();
  const refConfirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = refUsername.current.value;
    const password = refPassword.current.value;
    const email = refEmail.current.value;
    const confirmPassword = refConfirmPassword.current.value;

    try {
      const fetchedData = await axios.post(
        "https://localhost:7015/api/v1/Auth/Register",
        {
          username,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigateTo("/login");
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 bg-yellow-100 dark:bg-yellow-700 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-500 dark:text-yellow-300 mb-8">
          Register
        </h1>
        <div className="bg-yellow-200 dark:bg-yellow-600 p-4 rounded-lg shadow-md mb-6">
          <p className="text-lg font-semibold text-black dark:text-white mb-3">
            Requirements:
          </p>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <div>
              <p className="font-medium">Username:</p>
              <ul className="list-disc pl-5">
                <li>At least 5 characters long.</li>
                <li>At least one uppercase letter (A-Z).</li>
                <li>At least one lowercase letter (a-z).</li>
                <li>At least one number (0-9).</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Password:</p>
              <ul className="list-disc pl-5">
                <li>At least 8 characters long.</li>
                <li>At least one uppercase letter (A-Z).</li>
                <li>At least one lowercase letter (a-z).</li>
                <li>At least one number (0-9).</li>
              </ul>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          <div>
            <input
              id="username"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
              placeholder="Username"
              ref={refUsername}
              required
            />
          </div>
          <div>
            <input
              id="email"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="email"
              placeholder="Email"
              ref={refEmail}
              required
            />
          </div>
          <div>
            <input
              id="password"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="password"
              placeholder="Password"
              ref={refPassword}
              required
            />
          </div>
          <div>
            <input
              id="passwordConfirm"
              className="w-full px-4 py-3 text-black placeholder-gray-700 bg-white dark:bg-yellow-600 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="password"
              placeholder="Confirm Password"
              ref={refConfirmPassword}
              required
            />
          </div>
          <button
            className="w-full py-3 text-lg font-bold text-black bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 transition-transform transform hover:scale-105"
            type="submit"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

export default function Settings() {
  const userInfo = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);

  const refOldPassword = useRef();
  const refNewPassword = useRef();
  const refConfirmNewPassword = useRef();

  const confirmHandle = async () => {
    try {
      const res = await axios.post(
        `https://localhost:7015/api/v1/Account/ConfirmEmail`,
        {},
        {
          withCredentials: true,
        },
        {
          Accept: "*/*",
          Host: "http://localhost:3000",
        }
      );

      return alert("Confirmation is send");
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const resetPasswordHandle = async (e) => {
    e.preventDefault();

    const oldPassword = refOldPassword.current.value;
    const newPassword = refNewPassword.current.value;
    const confirmNewPassword = refConfirmNewPassword.current.value;

    try {
      const res = await axios.post(
        `https://localhost:7015/api/v1/Account/ResetPassword`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          withCredentials: true,
        },
        {
          Accept: "*/*",
          Host: "http://localhost:3000",
        }
      );

      setIsOpen(false);
      return alert("Confirmation is send");
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100  dark:bg-gray-900 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-yellow-100 dark:bg-yellow-700 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-300 mb-4">
          User Profile
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Username:</span>
            <span>{userInfo.username}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Email:</span>
            <span>{userInfo.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Email Confirmed:</span>
            <span
              className={`font-bold ${
                userInfo.isEmailConfirmed ? "text-green-600" : "text-red-600"
              }`}
            >
              {userInfo.isEmailConfirmed ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        {!userInfo.isEmailConfirmed && (
          <button
            onClick={confirmHandle}
            className="w-full py-3 bg-yellow-500 dark:bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition"
          >
            Confirm Email
          </button>
        )}
        <button
          className={`w-full py-3 rounded-lg font-bold transition ${
            userInfo.isEmailConfirmed
              ? "bg-yellow-500 dark:bg-yellow-400 text-black hover:bg-yellow-600 dark:hover:bg-yellow-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!userInfo.isEmailConfirmed}
          onClick={() => userInfo.isEmailConfirmed && setIsOpen(true)}
        >
          Reset Password
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Reset Password Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-lg shadow-lg relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Reset Password
          </h2>
          <form onSubmit={resetPasswordHandle}>
            <div className="mb-4">
              <label
                htmlFor="old-password"
                className="block text-sm font-medium mb-1"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
                ref={refOldPassword}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
                ref={refNewPassword}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
                ref={refConfirmNewPassword}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 dark:bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

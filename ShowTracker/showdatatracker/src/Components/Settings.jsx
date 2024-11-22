import React, { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

export default function Settings() {
  const isEmailConfirmed = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);

  const refOldPassword = useRef();
  const refNewPassword = useRef();
  const refConfirmNewPassword = useRef();

  const confrimHandle = async () => {
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
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {isEmailConfirmed.isConfirmed ? (
          <div className="text-green-600 text-lg font-bold mb-4">
            Email is confirmed
          </div>
        ) : (
          <button
            className="dark:text-gray-300 bg-black shadow-lg mt-6 p-2 text-white rounded-lg hover:scale-105 hover:text-orange-600 transition duration-300 ease-in-out"
            onClick={confrimHandle}
          >
            Confirm Email
          </button>
        )}

        <button
          className={`py-2 px-4 rounded ${
            isEmailConfirmed.isConfirmed
              ? "dark:text-gray-300 bg-black shadow-lg mt-6 p-2 text-white rounded-lg hover:scale-105 hover:text-orange-600 transition duration-300 ease-in-out"
              : "bg-gray-300 text-gray-500 cursor-not-allowed mt-6 p-2 rounded-lg"
          }`}
          disabled={!isEmailConfirmed.isConfirmed}
          onClick={() => {
            if (isEmailConfirmed.isConfirmed) {
              setIsOpen(true);
            }
          }}
        >
          Reset Password
        </button>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Reset Password Modal"
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            {/* Кнопка закрытия модального окна */}
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

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Reset Password
            </h2>
            <form onSubmit={resetPasswordHandle}>
              {/* Поле для старого пароля */}
              <div className="mb-4">
                <label
                  htmlFor="old-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  id="old-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={refOldPassword}
                />
              </div>

              {/* Поле для нового пароля */}
              <div className="mb-4">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={refNewPassword}
                />
              </div>

              {/* Поле для подтверждения нового пароля */}
              <div className="mb-4">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  ref={refConfirmNewPassword}
                />
              </div>

              {/* Кнопка отправки */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="dark:text-gray-300 bg-black shadow-lg mt-6 p-2 text-white rounded-lg hover:scale-105 hover:text-orange-600 transition duration-300 ease-in-out"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

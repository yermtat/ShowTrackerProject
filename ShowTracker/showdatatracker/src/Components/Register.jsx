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

      console.log(fetchedData);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      return alert(error.response.data.error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="w-full relative mb-20">
        <div class="h-screen  flex justify-center items-center dark:bg-gray-900">
          <div class="grid gap-8">
            <div id="back-div" class="  rounded-[70px] m-4">
              <div class="border-[70px] border-transparent rounded-[70px] bg-gray-400 shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2 bg-opacity-50">
                <h1 class="pt-8 pb-6 font-bold text-white text-5xl text-center cursor-default">
                  Register
                </h1>
                <div>
                  <div class="text-white text-xs m-2">
                    <p class="mb-2 font-semibold">Username Requirements:</p>
                    <ul class="list-disc pl-5 mb-4">
                      <li>Must be at least 5 characters long.</li>
                      <li>Include at least one uppercase letter (A-Z).</li>
                      <li>Include at least one lowercase letter (a-z).</li>
                      <li>Include at least one number (0-9).</li>
                    </ul>
                    <p class="mb-2 font-semibold">Password Requirements:</p>
                    <ul class="list-disc pl-5">
                      <li>Must be at least 8 characters long.</li>
                      <li>Include at least one uppercase letter (A-Z).</li>
                      <li>Include at least one lowercase letter (a-z).</li>
                      <li>Include at least one number (0-9).</li>
                    </ul>
                  </div>
                </div>
                <form onSubmit={handleSubmit} method="post" class="space-y-4">
                  <div>
                    <input
                      id="usaername"
                      class="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="username"
                      placeholder="Username"
                      ref={refUsername}
                      required
                    />
                  </div>
                  <div>
                    <input
                      id="email"
                      class="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="email"
                      placeholder="Email"
                      ref={refEmail}
                      required
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="password"
                      placeholder="Password"
                      ref={refPassword}
                      required
                    />
                  </div>
                  <div>
                    <input
                      id="passwordConfirm"
                      class="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="password"
                      placeholder="Confrim password"
                      ref={refConfirmPassword}
                      required
                    />
                  </div>
                  <button
                    class="dark:text-gray-300 bg-black shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:text-orange-600 transition duration-300 ease-in-out"
                    type="submit"
                  >
                    REGISTER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

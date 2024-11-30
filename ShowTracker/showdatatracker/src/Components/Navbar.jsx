import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Popup from "reactjs-popup";
import { authContext } from "./MainWindow";
import { useNavigate } from "react-router-dom";
import { logout } from "../Actions/Actions";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const isAuthorized = useContext(authContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandle = async () => {
    try {
      await logout();
      localStorage.removeItem("isAuthorized");
      isAuthorized.setAuthState(false);
      navigateTo("/login");
    } catch (ex) {
      console.log(ex);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <nav className="bg-black p-4 w-screen">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="text-white font-bold text-3xl mb-4 lg:mb-0 transition-colors duration-300 hover:text-orange-600 hover:cursor-pointer">
            ShowTracker
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={`lg:flex flex-col lg:flex-row ${
              isOpen ? "block" : "hidden"
            } lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}
          >
            <Link to="/home">
              <div
                href="/"
                className="text-white  px-4 py-2 transition-colors duration-300 hover:text-orange-600 "
              >
                Home
              </div>
            </Link>
            {isAuthorized.authState && (
              <div
                className={`lg:flex flex-col lg:flex-row ${
                  isOpen ? "block" : "hidden"
                } lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl`}
              >
                <Link to="/myshows">
                  <div
                    href="/"
                    className="text-white  px-4 py-2 transition-colors duration-300 hover:text-orange-600 "
                  >
                    My shows
                  </div>
                </Link>
                <Link to="/watchLater">
                  <div
                    href="/"
                    className="text-white  px-4 py-2 transition-colors duration-300 hover:text-orange-600 "
                  >
                    Watch later
                  </div>
                </Link>
                <Link to="/favourites">
                  <div
                    href="/"
                    className="text-white  px-4 py-2 transition-colors duration-300 hover:text-orange-600 "
                  >
                    Favourites
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div className="flex">
            <Popup
              trigger={
                <button>
                  {" "}
                  <svg
                    className="h-6 w-6 text-white duration-300 hover:text-orange-600"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="9" cy="7" r="4" />{" "}
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />{" "}
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />{" "}
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                  </svg>
                </button>
              }
              position="bottom center"
            >
              <div className="w-28 border shadow-lg border-black rounded-lg bg-white p-1 flex justify-center flex-col items-center">
                {!isAuthorized.authState ? (
                  <div>
                    <Link to="/login">
                      <div className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-orange-400">
                        Login
                      </div>
                    </Link>
                    <Link to="/register">
                      <div className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-orange-400 margin-10px">
                        Register
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div
                      className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-orange-400 cursor-pointer"
                      onClick={logoutHandle}
                    >
                      Logout
                    </div>
                    <Link to="/settings">
                      <div className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-orange-400">
                        Settings
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </Popup>

            {/* <svg
              className="h-6 w-6 text-white duration-300 hover:text-orange-600 hover:cursor-pointer"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />{" "}
              <circle cx="12" cy="12" r="3" />
            </svg> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

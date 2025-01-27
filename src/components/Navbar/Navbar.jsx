import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/freshcart-logo.svg";
import { UserContext } from "./../../Context/UserContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 border-gray-200 bg-slate-300">
        <div className="max-w-screen-xl mb-11 md:mb-0 flex flex-wrap items-center justify-between mx-auto p-4 bg-slate-300 md:bg-transparent">
          <div className="flex items-center px-4  ">
            <Link
              to=""
              className="flex mr-2 items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                style={{ width: "120px" }}
                className="h-8 w-full block"
                alt="Flowbite Logo"
              />
            </Link>

            {userLogin !== null && (
              <div
                className="hidden bg-slate-300 md:bg-transparent w-full md:block md:w-auto "
                id="navbar-default"
              >
                <ul className="flex  bg-slate-300 md:bg-transparent  font-medium  flex-col p-4 md:p-0  border  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 w-full md:border-0 absolute top-[50px] md:top-0 lef-0 right-0 md:relative mt-16">
                  <li>
                    <NavLink
                      className="block  text-slate-600  rounded-sm  p-0  "
                      aria-current="page"
                      to=""
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block  text-slate-600  rounded-sm  p-0  "
                      aria-current="page"
                      to="cart"
                    >
                      Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block  text-slate-600  rounded-sm  p-0  "
                      aria-current="page"
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block  text-slate-600  rounded-sm  p-0 "
                      aria-current="page"
                      to="categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block  text-slate-600  rounded-sm  p-0  "
                      aria-current="page"
                      to="brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-3 items-center">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </ul>
            <ul className="flex gap-3 items-center">
              {userLogin !== null ? (
                <li>
                  <span onClick={signOut} className="cursor-pointer">
                    Sign Out
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}

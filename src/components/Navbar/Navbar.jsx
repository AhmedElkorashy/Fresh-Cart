import React, { useContext, useState } from "react"; // Add useState
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/freshcart-logo.svg";
import { UserContext } from "./../../Context/UserContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for dropdown

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown state
  };

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 border-gray-200 bg-slate-300">
        <div className="flex md:flex-row sm:flex-col flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                style={{ width: "120px" }}
                className="h-8 w-full block"
                alt="Flowbite Logo"
              />
            </Link>

            <>
              <button
                onClick={toggleDropdown} // Add click handler
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isOpen} // Set aria-expanded based on state
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

              {userLogin !== null && (
                <div
                  className={`md:block ${
                    isOpen ? "block" : "hidden"
                  } w-full md:w-auto`}
                  id="navbar-default"
                >
                  <ul className="flex  gap-3 ">
                    <li>
                      <NavLink className="text-slate-500" to="">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-slate-500" to="cart">
                        Cards
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-slate-500" to="products">
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-slate-500" to="categories">
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="text-slate-500" to="brands">
                        Brands
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </>
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
        </div>
      </nav>
    </>
  );
}

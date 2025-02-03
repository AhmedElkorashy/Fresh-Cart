import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { WishListContext } from "../../Context/WishListContext";
import { cartContext } from "./../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cartCounter, setCartCounter } = useContext(cartContext);
  let { wishListIds, setWishListIds } = useContext(WishListContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCartCounter(JSON.parse(localStorage.getItem("cartCounter")));
    setWishListIds(JSON.parse(localStorage.getItem("wishListIds")));
  }, [setCartCounter]);

  let navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  let NumberOfWishes = wishListIds?.length;
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-gray-200 bg-slate-300">
      <div className="max-w-screen-xl mb-11 md:mb-0 flex flex-wrap items-center justify-between mx-auto p-4 bg-slate-300 md:bg-transparent">
        <div className="flex items-center px-4">
          <Link
            to=""
            className="flex mr-2 items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="flex font-bold text-2xl md:me-2 items-center justify-center">
              <i className="fa-solid fa-cart-shopping nav-icon text-emerald-600" />
              <span className="h3 bold">fresh cart</span>
            </div>
          </Link>
          {userLogin !== null && (
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } bg-slate-300 md:bg-transparent w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul
                onClick={() => setMenuOpen(false)}
                className="flex bg-slate-300 md:bg-transparent font-medium flex-col p-4 md:p-0 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 w-full md:border-0 absolute top-[50px] md:top-0 left-0 right-0 md:relative mt-16"
              >
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to=""
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="cart"
                  >
                    Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="flex justify-center w-fit mx-auto relative">
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="WishList"
                  >
                    Wish List
                  </NavLink>
                  <small className="text-white font-bold py-0 px-1 rounded-md bg-emerald-600 absolute top-[-8px] right-[-13px]">
                    {NumberOfWishes}
                  </small>
                </li>
                <li>
                  <NavLink
                    className="block text-slate-600 rounded-sm p-0"
                    to="allorders"
                  >
                    All Orders
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className="flex gap-3 items-center">
            {userLogin != null ? (
              <li className="relative flex">
                <span className="absolute top-[-12px] right-[-10px] py-0 px-1 rounded-lg block bg-emerald-600 text-white">
                  {cartCounter}
                </span>
                <Link to={"cart"}>
                  <i className="fa-solid fa-cart-shopping text-2xl nav-icon text-emerald-600" />
                </Link>
              </li>
            ) : (
              <i className="fa-solid fa-cart-shopping text-2xl nav-icon text-emerald-600" />
            )}
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
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
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
  );
}

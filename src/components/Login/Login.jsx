/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { cartContext } from "./../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";

export default function Register() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let {
    addProductToCart,
    setCartCounter,
    cartCounter,
    getProductToCart,
    setCarts,
  } = useContext(cartContext);
  let {
    addToWishList,
    removeFromWishList,
    setWishListIds,
    wishListIds,
    getWishList,
  } = useContext(WishListContext);

  const [loading, setLoading] = useState(false);
  const [ErrorState, setErrorState] = useState("");
  async function getWishListBridge() {
    let res = await getWishList();
    // console.log(res);
    setWishListIds(res?.data?.data);
  }
  async function getCart() {
    let response = await getProductToCart();
    // console.log(response);
    if (response.data.status === "success") {
      // console.log(response);
      setCarts(response.data.data);
    }
  }
  useEffect(() => {
    document.title = "Login";
    // getWishListBridge();
    // getCart();
  }, []);
  let navigate = useNavigate();
  function handleLogin(values) {
    setLoading(true);
    // calling api
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((response) => {
        setLoading(false);
        setErrorState("");
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          // localStorage.setItem("cartCounter", JSON.stringify(cartCounter));
          // localStorage.setItem("wishListIds", JSON.stringify(wishListIds?.id));
          setUserLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);

        setErrorState(error.response.data.message);
      });
  }
  // for validation using yup
  let validationSchema = yup.object().shape({
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required("password is required"),
  });
  // for the form using formik
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <>
      <h2 className="text-green-600 text-2xl my-4  font-bold">Login Now</h2>
      {ErrorState ? (
        <div className="p-2 capitalize max-w-md mx-auto my-4 text-sm text-red-800 rounded-lg bg-red-50 ">
          {ErrorState}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-2 capitalize my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <small className="font-medium">{formik.errors.email}</small>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-2 capitalize my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <small className="font-medium">{formik.errors.password}</small>
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 items-center justify-between">
          <button
            type="submit"
            className="text-white text-left block bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 "
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Log-in"}
          </button>
          {/* <Link to="/register">
            <span className="capitalize text-green-500 underline border-2">
              iF you do nt have an account Register Now
            </span>
          </Link> */}
          <Link to="/forgetPassword">
            <span className="capitalize text-green-500 underline">
              forget password
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}

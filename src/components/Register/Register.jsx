/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import style from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./../../Context/UserContext";

export default function Register() {
  let { setUserLogin, userLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [ErrorState, setErrorState] = useState("");
  useEffect(() => {
    document.title = "Register";
  }, []);
  let navigate = useNavigate();
  function handleRegister(values) {
    setLoading(true);
    // calling api
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((response) => {
        setLoading(false);
        setErrorState("");
        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setUserLogin(response.data.token);
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
        setErrorState(error.response.data.message);
      });
  }
  // for validation using yup
  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("not valid email").required("email is required"),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "not matching with password")
      .required("rePassword is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "not valid phone number")
      .required("phone is required"),
  });
  // for the form using formik
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <h2 className="text-green-600 text-2xl my-4  font-bold">Register Now</h2>
      {ErrorState ? (
        <div className="p-2 capitalize max-w-md mx-auto my-4 text-sm text-red-800 rounded-lg bg-red-50 ">
          {ErrorState}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your Name
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-2 capitalize my-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <small className="font-medium">{formik.errors.name}</small>
            </div>
          ) : null}
        </div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your rePassword
          </label>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-2 capitalize my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <small className="font-medium">{formik.errors.rePassword}</small>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-2 capitalize my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <small className="font-medium">{formik.errors.phone}</small>
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="text-white text-left block bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 "
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
          <Link to="/login">
            <span className="capitalize text-green-500 underline">
              iF you have an account click here
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}

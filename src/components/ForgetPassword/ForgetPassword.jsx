/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  async function forgetPasswordSubmit(values) {
    setLoading(true);

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        setLoading(false);

        console.log(res);
        if (res.data.statusMsg === "success") {
          navigate("/restCode");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: forgetPasswordSubmit,
  });

  return (
    <div className="sm:mt-20 mt-10">
      <h1 className="text-3xl font-semibold capitalize text-start">
        Please enter your email to receive a verification code
      </h1>

      <div className="mt-10">
        <form className="relative" onSubmit={formik.handleSubmit}>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
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
          <button
            type="submit"
            className="mt-4 text-center text-white text-left block bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

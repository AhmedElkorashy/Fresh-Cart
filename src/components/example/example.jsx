/* eslint-disable no-unused-vars */
import React from "react";
import style from "./Example.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { axios } from "axios";

export default function Example() {
  async function handleSubmit(values) {
    let res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      values
    );
  }
  let handleValidation = yup.object().shape({
    name: yup
      .string()
      .min(3, "name must be at least 3 characters")
      .max(10, "name must be at least 10 characters")
      .required("name is required"),
    email: yup
      .string()
      .email("enter right email ")
      .required("email is required"),
    password: yup
      .string()
      .min(6, "password must be at least 6 characters")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "doesn't match")
      .required("rePassword is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "add an egyptian number")
      .required("phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: handleValidation,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <form className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <small className="font-medium">{formik.errors.name}</small>
            </div>
          ) : null}
        </div>
      </form>
    </>
  );
}

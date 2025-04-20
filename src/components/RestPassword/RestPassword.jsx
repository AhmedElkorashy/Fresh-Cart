/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function ResetPasswordSubmit(values) {
    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((response) => {
        setLoading(false);
        // console.log(response);
        setUserLogin(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
        // if (response.statusText === " OK") {
        // }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Reset Password Error:", error.response); 
        alert(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      });
  }

  // Validation using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: ResetPasswordSubmit,
  });

  return (
    <>
      <h2 className="text-green-600 text-start  text-2xl my-4 font-bold">
        Reset Password
      </h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600"
          >
            Enter your Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <small className="font-medium">{formik.errors.email}</small>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-emerald-600"
          >
            Enter your new password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div className="p-2 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              <small className="font-medium">{formik.errors.newPassword}</small>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 items-center justify-between">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

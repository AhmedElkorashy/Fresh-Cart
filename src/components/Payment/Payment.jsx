/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import style from "./Payment.module.css";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function Payment() {
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [paymentSpinner, setPaymentSpinner] = useState(false);
  const [paymentSpinnerOnline, setPaymentSpinnerOnline] = useState(false);
  let { cartId, setCartCounter } = useContext(cartContext);
  console.log(cartId);

  async function getDetails() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    setPaymentSpinner(true);
    const values = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
    };
    try {
      let x = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { values },
        {
          headers,
        }
      );
      if (x?.data.status === "success") {
        localStorage.setItem("cartCounter", 0);
        setCartCounter(0); // Update state
        toast.success("Cart Ordered successfully");
      }
      console.log(x);
    } catch (error) {
      toast.error("Request failed with status code 404");
      console.log(error);
    } finally {
      setPaymentSpinner(false);
    }
  }

  async function onlinePayment() {
    let headers = {
      token: localStorage.getItem("userToken"),
    };
    setPaymentSpinnerOnline(true);
    const values = {
      shippingAddress: {
        details: details,
        phone: phone,
        city: city,
      },
    };
    try {
      let x = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { values },
        {
          headers,

          params: {
            url: "https://fresh-cart-nine-theta.vercel.app/#",
          },
        }
      );
      if (x?.data.status === "success") {
        // localStorage.setItem("cartCounter", 0);
        // setCartCounter(0); // Update state
        toast.success("Cart Ordered successfully");
        window.open(x.data.session.url);
      }
      console.log(x?.data.session.url);
    } catch (error) {
      toast.error("Request failed with status code 404");
      console.log(error);
    } finally {
      setPaymentSpinnerOnline(false);
    }
    // console.log(values);
  }
  return (
    <div className="py-10 md:w-[60%] px-5 mx-auto my-5">
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          type="text"
          name="Details"
          id="Details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="rePassword"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter your Details
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="tel"
          name="phone"
          id="phone"
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
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => {
            setCity(e.target.value);
          }}
          type="text"
          name="City"
          id="City"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="rePassword"
          className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter your City
        </label>
      </div>
      <div className="flex flex-wrap  px-2 mx-auto   justify-center sm:justify-between">
        <button
          onClick={getDetails}
          className="btn-info mx-auto     my-4 font-bold md:max-w-xs max-w-full"
        >
          {paymentSpinner ? (
            <i className="fas fa-spinner  fa-spin"></i>
          ) : (
            "Cash Payment"
          )}
        </button>
        <button
          onClick={onlinePayment}
          className="btn mx-auto    my-4 font-bold md:max-w-xs max-w-full"
        >
          {paymentSpinnerOnline ? (
            <i className="fas fa-spinner  fa-spin"></i>
          ) : (
            "Online Payment"
          )}
        </button>
      </div>
    </div>
  );
}

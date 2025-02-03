/* eslint-disable no-unused-vars */
import React from "react";
import style from "./AllOrders.module.css";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
export default function AllOrders() {
  useEffect(() => {
    document.title = "All Orders";
  }, []);
  const { id } = jwtDecode(localStorage.getItem("userToken"));

  async function getAllOrders() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  let { isLoading, data } = useQuery({
    queryKey: "allOrders",
    queryFn: getAllOrders,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed inset-0">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="my-7">
      <div className="row">
        {data?.data && data.data.length > 0 ? (
          data.data.map((item, i) => (
            <div
              key={i}
              className="sm:w-1/4  font-semibold cursor-pointer p-6  rounded-lg myShadow  mb-3  mx-auto"
            >
              <div className="row">
                {item?.cartItems?.map((orders, index) => (
                  <div key={index} className="p-2 w-1/2">
                    <img
                      src={orders?.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <h2 className="capitalize">
                total order price: {item?.totalOrderPrice} EGP
              </h2>
              <h2 className="capitalize">
                payment method: {item?.paymentMethodType}
              </h2>
            </div>
          ))
        ) : (
          <div className="p-2 capitalize my-4 max-full mx-auto text-sm text-red-800 rounded-lg bg-red-50">
            <small className="font-medium"> No orders found.</small>
          </div>
        )}
      </div>
    </div>
  );
}

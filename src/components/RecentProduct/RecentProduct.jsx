/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import style from "./RecentProduct.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "./../../Hooks/useProducts";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProduct() {
  let { data, isError, error, isLoading, isFetching } = useProducts();
  let { addProductToCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  // console.log(data?.data?.data);
  if (isError) {
    return <h3 className="bg-red-500">{error}</h3>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed inset-0">
        <span className=" loader"></span>
      </div>
    );
  }
  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setLoading(false);
      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }
  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="md:w-1/5 lg:w-1/6 sm:w-1/3">
            <div className="product p-3 ">
              <Link
                to={`productDetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-green-500 text-left">
                  {product.category.name}
                </h3>
                <h3 className="font-semibold text-left truncate">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  addToCart(product.id);
                }}
                className="btn"
              >
                {loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  " Add to Card"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

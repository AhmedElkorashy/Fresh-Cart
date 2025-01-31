/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import style from "./RecentProduct.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "./../../Hooks/useProducts";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProduct() {
  let { data, isError, error, isLoading, isFetching } = useProducts();
  let { addProductToCart, setCartCounter, cartCounter } =
    useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [searchProducts, setSearchProducts] = useState([]);

  let {
    addToWishList,
    removeFromWishList,
    setWishListIds,
    wishListIds,
    getWishList,
  } = useContext(WishListContext);

  async function addToWishListBridge(id) {
    let res = await addToWishList(id);
    // console.log(res.data.data);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setWishListIds(res.data.data);
      localStorage.setItem("wishListIds", JSON.stringify(res?.data.data));
    } else {
      toast.error(res.data.message);
    }
  }
  async function removeFromWishListBridge(id) {
    let res = await removeFromWishList(id);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      localStorage.setItem("wishListIds", JSON.stringify(res?.data.data));
      setWishListIds(res.data.data);
    } else {
      toast.error(res.data.message);
    }
    // console.log(res.data);
  }
  async function getWishListBridge() {
    let res = await getWishList();
    // console.log(res);
    // localStorage.setItem("wishListIds", JSON.stringify(res?.data.data));
    setWishListIds(res?.data?.data);
  }
  useEffect(() => {
    const savedCounter = JSON.parse(localStorage.getItem("cartCounter")) || 0;
    setCartCounter(savedCounter);
    getWishListBridge();
    setSearchProducts(data?.data?.data);
    console.log(searchProducts);

    // setWishListIds(JSON.parse(localStorage.getItem("wishListIds"));)
  }, [data]);
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
    // console.log(response?.data?.data?.products);

    if (response.data.status == "success") {
      localStorage.setItem("cartCounter", response?.data.data.products.length);
      setCartCounter(response?.data.data.products.length); // Update state
      setLoading(false);
      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <form className="max-w-lg mx-auto ">
        <div className="py-4">
          <input
            onInput={(e) => {
              // var regex = new RegExp(e.target.value, "gi");
              const inputValue = e.target.value.toLowerCase();
              const filteredProducts = data?.data?.data.filter((item) =>
                item.title.toLowerCase().includes(inputValue)
              );
              setSearchProducts(filteredProducts);
              console.log(filteredProducts);
            }}
            type="text"
            id="search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
      </form>
      <div className="row ">
        {searchProducts == [] && searchProducts.length !== 0
          ? data?.data?.data
          : searchProducts?.map((product) => (
              <div
                key={product.id}
                className="md:w-1/5 rounded-lg myShadow lg:w-1/6 sm:w-1/3"
              >
                <div className="product p-3 relative">
                  <div className="absolute top-[30px] right-[30px]">
                    <button
                      style={{
                        color: JSON?.parse(
                          localStorage.getItem("wishListIds")
                        )?.includes(product.id)
                          ? "red"
                          : "rgba(0,0,0,.8)",
                      }}
                      onClick={() =>
                        JSON.parse(
                          localStorage.getItem("wishListIds")
                        )?.includes(product.id)
                          ? removeFromWishListBridge(product.id)
                          : addToWishListBridge(product.id)
                      }
                      className={` w-25 m-0  `}
                    >
                      <i className="fa-solid fa-heart m-0  "></i>
                    </button>
                  </div>
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

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import style from "./WishList.module.css";
import { WishListContext } from "../../Context/WishListContext";
import Slider from "react-slick";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { cartContext } from './../../Context/CartContext';
export default function WishList() {
  let { getWishList, setWishListIds, wishListIds, removeFromWishList } =
    useContext(WishListContext);
  let { addProductToCart, setCartCounter, cartCounter } =
    useContext(cartContext);
  const [currentId, setCurrentId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [removeSpinner, setRemoveSpinner] = useState(false);

  async function getWishListBridge() {
    let res = await getWishList();
    console.log(res);
    setWishListIds(res?.data?.data);
  }
  async function removeFromWishListBridge(id) {
    setRemoveSpinner(true);
    setCurrentId(id);
    let res = await removeFromWishList(id);
    // setWishListIds(res.data.data);
    // console.log(res.data);
    if (res.data.status === "success") {
      setRemoveSpinner(false);
      localStorage.setItem("wishListIds", JSON.stringify(res?.data.data));
      toast.success(res.data.message);
    } else {
      setRemoveSpinner(false);
      toast.error(res.data.message);
    }
    setRemoveSpinner(false);
  }
  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
       let counter = cartCounter + 1; // Increment the counter
       setCartCounter(counter); // Update state
       localStorage.setItem("cartCounter", JSON.stringify(counter));
      setLoading(false);
      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getWishListBridge();
    document.title = "Wish List";
  }, [wishListIds]);
  return (
    <>
      {wishListIds != null ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-center" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {wishListIds?.length > 0 ? (
                  <>
                    {wishListIds?.map((product) => (
                      <tr
                        key={product?.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product?.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product?.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product?.title?.split(" ").slice(0, 2).join(" ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <i className="fas fa-star me-1 text-yellow-300"></i>
                            {product.ratingsAverage}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} $
                        </td>
                        <td className="px-6 py-4 ">
                          <span
                            onClick={() => {
                              removeFromWishListBridge(product.id);
                            }}
                            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                          >
                            {removeSpinner && currentId === product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              "Remove"
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 ">
                          <span
                            onClick={() => {
                              addToCart(product.id);
                            }}
                            className=" text-emerald-600 hover:underline font-medium cursor-pointer capitalize"
                          >
                            {loading && currentId == product.id ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              " Add to Card"
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="5">
                      <h2 className="font-bold text-2xl  text-center text-emerald-600 capitalize mx-auto">
                        there is no WishList
                      </h2>
                    </td>
                  </tr>
                )}
              </>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center fixed inset-0">
          <span className=" loader"></span>
        </div>
      )}
    </>
  );
}

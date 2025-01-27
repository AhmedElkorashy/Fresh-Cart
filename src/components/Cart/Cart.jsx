/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import style from "./Cart.module.css";
import { useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Cart() {
  const [carts, setCarts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteAllSpinner, setDeleteAllSpinner] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [myState, setMyState] = useState("");
  const [removeSpinner, setRemoveSpinner] = useState(false);
  let {
    deleteAllCart,
    deleteProductFromCart,
    getProductToCart,
    updateProductToCart,
  } = useContext(cartContext);
  async function clearCart() {
    setDeleteAllSpinner(true);
    let response = await deleteAllCart();
    // console.log(response);
    if (response.data.message === "success") {
      console.log(response);
      toast.success("Cart deleted successfully");
      setMyState(response?.config?.method);
      setCarts(response.data.data);
    } else {
      toast.error("Error clearing");
    }
    setDeleteAllSpinner(false);
  }
  async function getCart() {
    let response = await getProductToCart();
    // console.log(response);
    if (response.data.status === "success") {
      // console.log(response.data.status);
      setCarts(response.data.data);
    }
  }
  async function updateProduct(id, count) {
    setLoading(true);
    setCurrentId(id);
    let response = await updateProductToCart(id, count);
    // console.log(response);
    if (response.data.status === "success") {
      setLoading(false);
      setCarts(response.data.data);
      toast.success("Product Updated successfully");
    } else {
      setLoading(false);
      toast.error("Product not added successfully");
    }
  }
  async function deleteItem(id) {
    setRemoveSpinner(true);
    setCurrentId(id);
    let response = await deleteProductFromCart(id);
    // console.log(response);
    if (response.data.status === "success") {
      setRemoveSpinner(false);
      setCarts(response.data.data);
      toast.success("Product Deleted successfully");
    } else {
      setRemoveSpinner(false);
      toast.error("Product not Deleted successfully");
    }
  }
  useEffect(() => {
    document.title = "Cards";
    getCart();
  }, []);
  return (
    <>
      {carts?.products != null || myState === "delete" ? (
        <>
          <h2 className="text-2xl text-center text-gray-700 font-bold my-4">
            Total Price:
            <span className="text-emerald-600"> {carts?.totalCartPrice}</span>
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts?.products?.length > 0 ? (
                  carts?.products.map((product) => (
                    <tr
                      key={product.product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              updateProduct(
                                product.product.id,
                                product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>
                              {loading && currentId == product.product.id ? (
                                <i className="fas fa-spinner fa-spin"></i>
                              ) : (
                                product.count
                              )}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              updateProduct(
                                product.product.id,
                                product.count + 1
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ${product.price * product.count}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => {
                            deleteItem(product.product.id);
                          }}
                          className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          {removeSpinner && currentId === product.product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <h2 className="font-bold text-2xl text-center text-emerald-600 capitalize mx-auto">
                        there is no products
                      </h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {carts?.products?.length > 0 && (
            <div className="text-start">
              <button
                onClick={() => {
                  clearCart();
                }}
                className="btn-danger my-4 font-bold max-w-sm "
              >
                {deleteAllSpinner ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Delete All"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center fixed inset-0">
          <span className=" loader"></span>
        </div>
      )}
    </>
  );
}

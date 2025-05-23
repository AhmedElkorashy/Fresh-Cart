/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";

import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import Cart from "./components/Cart/Cart";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./components/WishList/WishList";
import Payment from "./components/Payment/Payment";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import RestCode from "./components/RestCode/RestCode";
import RestPassword from "./components/RestPassword/RestPassword";

let query = new QueryClient();

let x = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "CategoriesDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <CategoriesDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "BrandsDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "restCode",
        element: <RestCode />,
      },
      {
        path: "restPassword",
        element: <RestPassword />,
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <UserContextProvider>
        <WishListContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <RouterProvider router={x}></RouterProvider>
              <Toaster />
            </CartContextProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </WishListContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

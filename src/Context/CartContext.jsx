/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useState } from "react";
// import useCardsDetails from "./../Hooks/useCardsDetails";

export let cartContext = createContext();
export default function CartContextProvider(props) {
  const [cartCounter, setCartCounter] = useState(
    localStorage.getItem("cartCounter")
      ? JSON.parse(localStorage.getItem("cartCounter"))
      : 0
  );
  const [cartId, setCartId] = useState(null);

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((Response) => Response )
      .catch((err) => err);
  }
  function getProductToCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }
  function updateProductToCart(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }
  function deleteProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }

  function deleteAllCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        deleteAllCart,
        getProductToCart,
        updateProductToCart,
        deleteProductFromCart,
        setCartCounter,
        cartCounter,
        setCartId,
        cartId,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

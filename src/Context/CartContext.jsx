import axios from "axios";
import { createContext } from "react";
// import useCardsDetails from "./../Hooks/useCardsDetails";

export let cartContext = createContext();
export default function CartContextProvider(props) {
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
      .then((Response) => Response)
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
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}

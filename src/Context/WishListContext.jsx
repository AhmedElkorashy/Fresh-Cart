/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext } from "react";
import { useState } from "react";

export let WishListContext = createContext();
export default function WishListContextProvider(props) {
  const [wishListIds, setWishListIds] = useState([]);
  let headers = { token: localStorage.getItem("userToken") };
  function addToWishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((Response) => Response)
      .catch((err) => err);
  }
  function removeFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }
  function getWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((Response) => Response)
      .catch((err) => err);
  }
  return (
    <WishListContext.Provider
      value={{
        addToWishList,
        removeFromWishList,
        getWishList,
        wishListIds,
        setWishListIds,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}

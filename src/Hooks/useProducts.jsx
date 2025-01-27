/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let products = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
    // staleTime: 10000,
    // retry: 5, =>default is 3
    // retryDelay: 5000,
  });
  return products;
}

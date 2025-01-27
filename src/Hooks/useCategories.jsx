/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function useCategories() {
  function getAllCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let CategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });
  return CategoryQuery;
}

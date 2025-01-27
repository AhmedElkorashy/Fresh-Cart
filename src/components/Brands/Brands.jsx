/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { error, data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
  console.log(data?.data?.data);

  useEffect(() => {
    document.title = "Brands";
    getAllBrands();
  }, []);
  return (
    <>
      <div className="row">
        {data?.data?.data.length > 0 ? (
          <>
            {data?.data?.data.map((items) => (
              <div className="md:w-1/5 lg:w-1/6 sm:w-1/3 p-2" key={items?._id}>
                <Link to={`/BrandsDetails/${items?._id}/${items.name}`}>
                  <img src={items.image} className="w-full block " alt="" />
                </Link>
                <h2 className="text-emerald-600 font-bold">{items?.name}</h2>
              </div>
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center fixed inset-0">
            <span className=" loader"></span>
          </div>
        )}
      </div>
    </>
  );
}

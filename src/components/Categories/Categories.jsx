/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useCategories from "./../../Hooks/useCategories";

export default function Categories() {
  let { isLoading, error, data } = useCategories();
  // console.log(data?.data?.data);
  useEffect(() => {
    document.title = "Categories";
  }, []);
  if (error) {
    return <div>Error loading categories</div>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed inset-0">
        <span className=" loader"></span>
      </div>
    );
  }
  return (
    <>
      <div className="row mx-auto text-center my-4">
        {data?.data.data.map((category) => (
          <div
            key={category?._id}
            className="sm:w-1/2 rounded-lg myShadow p-6 w-full lg:w-1/4 md:w-1/3"
          >
            <Link to={`/CategoriesDetails/${category?._id}/${category.name}`}>
              <img
                src={category?.image}
                className="w-full block h-[350px] object-cover"
                alt=""
              />
              <h2 className="font-bold text-emerald-600 my-3">
                {category?.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import style from "./Home.module.css";
import { useState } from "react";
import RecentProduct from "./../RecentProduct/RecentProduct";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecentProduct />
    </>
  );
}

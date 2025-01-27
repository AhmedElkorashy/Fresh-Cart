/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:2000,
  };
  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        // console.log(response.data.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
    <h2 className="text-left my-3 font-semibold text-gray-600">Shope popular Categories </h2>
      <Slider {...settings} className="mt-4">
        {categories.map((category, index) => (
          <div key={index}>
            <img src={category.image} className="w-full h-[200px] object-cover" alt="" />
            <h3 className="text-left">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}

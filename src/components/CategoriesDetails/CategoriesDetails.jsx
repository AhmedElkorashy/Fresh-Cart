/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import style from "./CategoriesDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Slider from "react-slick";
export default function CategoriesDetails() {
  let { id, category } = useParams();
  const [categoryState, setCategoryState] = useState(null);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  function CategoriesDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((response) => {
        console.log(response);
        setCategoryState(response?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    CategoriesDetails();
  }, []);
  return (
    <>
      {categoryState != null ? (
        <>
          <div className="row max-w-5xl mx-auto    text-center">
            <div className="w-full mx-auto text-center  ">
              <Slider {...settings} className="w-full mySlider">
                <img
                  src={categoryState?.image}
                  className="h-[450px] w-full object-contain block  "
                  alt={categoryState?.name}
                />
                <img
                  src={categoryState?.image}
                  className="h-[450px] w-full object-contain block  "
                  alt={categoryState?.name}
                />
              </Slider>
            </div>
          </div>
          <div className="row    max-w-5xl mx-auto text-black">
            <h2 className="text-center w-full font-bold text-emerald-600">
              {categoryState?.name}
            </h2>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center fixed inset-0">
          <span className=" loader"></span>
        </div>
      )}
    </>
  );
}

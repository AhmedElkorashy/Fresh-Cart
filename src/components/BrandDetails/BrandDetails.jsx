/* eslint-disable no-unused-vars */
import React from "react";
import style from "./BrandDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Slider from "react-slick";
import { useState } from 'react';
export default function CategoriesDetails() {
  let { id, category } = useParams();
  const [BrandsState, setBrandsState] = useState(null);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  function BrandsDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) => {
        console.log(response);
        setBrandsState(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    BrandsDetails();
  }, []);
  return (
    <>
      {BrandsState != null ? (
        <>
          <div className="row max-w-5xl mx-auto  my-4  text-center">
            <div className="w-full mx-auto text-center  ">
              <Slider {...settings} className="w-full mySlider">
                <img
                  src={BrandsState?.image}
                  className="h-[450px] w-full object-contain block  "
                  alt={BrandsState?.name}
                />
                <img
                  src={BrandsState?.image}
                  className="h-[450px] w-full object-contain block  "
                  alt={BrandsState?.name}
                />
              </Slider>
            </div>
          </div>
          <div className="row    max-w-5xl mx-auto text-black">
            <h2 className="text-center w-full font-bold text-emerald-600">
              {BrandsState?.name}
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

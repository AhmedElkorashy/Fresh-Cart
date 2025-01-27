/* eslint-disable no-unused-vars */
import React from "react";
import style from "./MainSlider.module.css";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };
  return (
    <>
      <div className="row">
        <div className="md:w-3/4 w-full">
        <Slider {...settings} className="">
          <img src={slide3} className="w-full h-[400px] object-cover" alt="" />
          <img src={slide4} className="w-full h-[400px] object-cover" alt="" />
          <img src={slide5} className="w-full h-[400px] object-cover" alt="" />

        </Slider>
        </div>
        <div className="md:w-1/4 w-full ">
          <img
            src={slide2}
            className="w-full object-cover   h-[200px]"
            alt=""
          />
          <img src={slide3} className="w-full object-cover h-[200px]" alt="" />
        </div>
      </div>

    </>
  );
}

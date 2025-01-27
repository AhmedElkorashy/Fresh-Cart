/* eslint-disable no-unused-vars */
import React from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { cartContext } from "./../../Context/CartContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  let { addProductToCart } = useContext(cartContext);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getAllProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        let res = response.data.data.filter(
          (product) => product.category.name === category
        );
        console.log(res);
        setRelatedProducts(res);
      })
      .catch((error) => {});
  }
  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
       setLoading(false);
      toast.success(response.data.message);
    } else {
       setLoading(false);
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);
  return (
    <>
      {product != null ? (
        <div className="row items-center max-w-6xl mx-auto  ">
          <div className="md:w-1/4 w-full">
            {product?.images.length > 1 ? (
              <Slider {...settings} className="w-full mySlider">
                {product?.images.map((src, i) => (
                  <img
                    key={i}
                    className="w-full object-cover"
                    src={src}
                    alt={`Product Image ${i + 1}`}
                  />
                ))}
              </Slider>
            ) : (
              <Slider {...settings} className="w-full mySlider">
                <img src={product.imageCover} className="w-full object-cover" />
                <img src={product.imageCover} className="w-full object-cover" />
              </Slider>
            )}
          </div>
          <div className="md:w-3/4 mx-auto text-left p-7   ">
            <h3 className="font-semibold text-2xl ">{product?.title}</h3>
            <h4 className="text-gray-500  ">{product?.description}</h4>
            <h4 className="mt-3">{product?.category.name}</h4>
            <div className="flex justify-between items-center ">
              <h4>{product?.price} EGP</h4>
              <h4>
                <i className="fas fa-star text-yellow-500"></i>
                {product?.ratingsAverage}{" "}
              </h4>
            </div>
            <button
              onClick={() => {
                addToCart(product.id);
              }}
              className="btn"
            >
              {loading && currentId == product.id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                " Add to Card"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center fixed inset-0">
          <span className=" loader"></span>
        </div>
      )}

      {/* ************************** */}

      <div className="row ">
        {relatedProducts.length > 0
          ? relatedProducts.map((product) => (
              <div key={product.id} className="md:w-1/5 lg:w-1/6 sm:w-1/3">
                <div className="product p-3 ">
                  <Link
                    to={`/productDetails/${product.id}/${product.category.name}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className="text-green-500 text-left">
                      {product.category.name}
                    </h3>
                    <h3 className="font-semibold text-left truncate">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    className="btn"
                  >
                    {loading && currentId == product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      " Add to Card"
                    )}
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

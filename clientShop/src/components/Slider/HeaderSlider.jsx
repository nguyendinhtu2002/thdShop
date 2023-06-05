import React, { useEffect } from "react";
import "./HeaderSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "./../../store/productSlice";
import { Link } from "react-router-dom";

const HeaderSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    centerMode: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAsyncProducts({
        limit: 25,
        skip: 25,
      })
    );
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }
  return (
    <div className="slider">
      <div className="container">
        <div className="slider-content overflow-x-hidden">
          <Slider {...settings}>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[0]?.id}`}>
                <img src={tempProducts[0]?.images[0]} alt="" />
              </Link>
            </div>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[1]?.id}`}>
                <img src={tempProducts[1]?.images[0]} alt="" />
              </Link>
            </div>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[2]?.id}`}>
                <img src={tempProducts[2]?.images[0]} alt="" />
              </Link>
            </div>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[3]?.id}`}>
                <img src={tempProducts[3]?.images[0]} alt="" />
              </Link>
            </div>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[4]?.id}`}>
                <img src={tempProducts[4]?.images[0]} alt="" />
              </Link>
            </div>
            <div className="slider-item">
              <Link to={`/product/${tempProducts[5]?.id}`}>
                <img src={tempProducts[5]?.images[0]} alt="" />
              </Link>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;

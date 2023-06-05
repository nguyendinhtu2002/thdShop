import React, { useEffect } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
// import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const pageNumber = location.search.split("=")[1] || 1;

  useEffect(() => {
    dispatch(
      fetchAsyncProducts()
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  // Ngẫu nhiên hóa các sản phẩm trong danh sách
  const tempProducts = [];
  if (products?.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  const handlePrev = () => {
    if (pageNumber > 1) {
      navigate(`/?page=${parseInt(pageNumber) - 1}`);
    }
  };

  const handleNext = () => {
    if (pageNumber < 4) {
      navigate(`/?page=${parseInt(pageNumber) + 1}`);
    }
  };

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>Xem sản phẩm của chúng tôi</h3>
              </div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={tempProducts} />
              )}
              <ul className="pagination">
                <li onClick={handlePrev} className="page-item">
                  &lt;
                </li>
                {Array(4)
                  .fill(0)
                  .map((e, i) => {
                    if (i + 1 === parseInt(pageNumber)) {
                      return (
                        <Link key={i} to={`/?page=${i + 1}`}>
                          <li className="page-item active">{i + 1}</li>
                        </Link>
                      );
                    }
                    return (
                      <Link key={i} to={`/?page=${i + 1}`}>
                        <li className="page-item">{i + 1}</li>
                      </Link>
                    );
                  })}
                <li className="page-item">...</li>
                <li onClick={handleNext} className="page-item">
                  &gt;
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

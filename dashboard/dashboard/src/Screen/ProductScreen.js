import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import MainProducts from "./../Components/Product/Main";

const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
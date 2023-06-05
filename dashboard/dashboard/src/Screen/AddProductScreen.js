import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddProductMain from "./../Components/Product/AddProduct";

const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
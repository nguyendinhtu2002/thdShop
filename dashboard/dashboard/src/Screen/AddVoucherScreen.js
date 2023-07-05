import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import AddVoucher from "./../Components/Voucher/AddVoucher";

const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddVoucher />
      </main>
    </>
  );
};

export default AddProduct;
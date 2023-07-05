import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import VoucherMain from "../Components/Voucher/VoucherMain";

const VoucherScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <VoucherMain />
      </main>
    </>
  );
};

export default VoucherScreen;

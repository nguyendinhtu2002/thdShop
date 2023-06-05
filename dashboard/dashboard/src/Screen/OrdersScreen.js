import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import OrderMain from "../Components/Orders/OrdersMain";

const OrderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain />
      </main>
    </>
  );
};

export default OrderScreen;
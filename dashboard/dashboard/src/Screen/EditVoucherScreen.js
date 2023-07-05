import React from "react";
import Header from "../Components/Header";
import EditVoucher from "../Components/Voucher/EditVoucher";
import Sidebar from "../Components/sidebar";
import { useParams } from "react-router-dom";

const EditPaymentScreen = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditVoucher id={id} />
      </main>
    </>
  );
};

export default EditPaymentScreen;

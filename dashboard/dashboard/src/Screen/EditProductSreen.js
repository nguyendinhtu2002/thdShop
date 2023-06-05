import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import EditUserMain from "../Components/Product/EditProduct";
import { useLocation, useParams } from "react-router-dom";

const EditProductScreen = () => {
  let { id } = useParams();
  //   const productId = location.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditUserMain id={id} />
      </main>
    </>
  );
};
export default EditProductScreen;

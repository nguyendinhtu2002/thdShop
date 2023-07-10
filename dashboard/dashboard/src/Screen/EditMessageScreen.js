import React from "react";
import Header from "../Components/Header";
import EditMessage from "../Components/Message/EditMessage";
import Sidebar from "../Components/sidebar";
import { useParams } from "react-router-dom";

const EditMessageScreen = () => {
  let { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditMessage id={id} />
      </main>
    </>
  );
};

export default EditMessageScreen;

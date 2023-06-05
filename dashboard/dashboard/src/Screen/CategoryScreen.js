import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import Main from "./../Components/Category/Main";

const CategoryScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Main />
      </main>
    </>
  );
};

export default CategoryScreen;
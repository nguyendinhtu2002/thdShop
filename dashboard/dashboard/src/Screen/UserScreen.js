import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import UserMain from "../Components/User/Usermain";

const UserScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserMain />
      </main>
    </>
  );
};

export default UserScreen;

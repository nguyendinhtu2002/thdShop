import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import MessageMain from "../Components/Message/MessageMain";

const MessageScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MessageMain />
      </main>
    </>
  );
};

export default MessageScreen;

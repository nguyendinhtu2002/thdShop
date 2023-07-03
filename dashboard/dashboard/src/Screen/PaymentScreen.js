import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import PaymentMain from "../Components/Payment/PaymentMain";

const PaymentScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <PaymentMain />
            </main>
        </>
    );
};

export default PaymentScreen;
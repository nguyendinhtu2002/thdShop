import React from "react";
import Sidebar from "./../Components/sidebar";
import Header from "./../Components/Header";
import VoucherScreen from "./VoucherScreen";

const PaymentScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <VoucherScreen />
            </main>
        </>
    );
};

export default PaymentScreen;
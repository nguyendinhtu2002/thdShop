import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import Voucher from "./Voucher";
import { useSelector } from "react-redux";
import * as VoucherService from "../../Services/VoucherService";
import { error } from "jquery";
const VoucherMain = () => {
      // const paymentList = useSelector((state) => state.paymentList);
      // const { loading, error, payments } = paymentList;
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [tempData, setTempData] = useState([]);
    const [search, SetSearch] = useState("");

    const hangldeGetAll = async () => {
        setLoading(true);
        const access_token = localStorage.getItem("access_token")
        console.log(typeof access_token)
        await VoucherService.getPay(JSON.parse(access_token))
            .then((res) => {
                setLoading(false);
                setTempData(res);
            })
            .catch((error) => {
                setError(error);
            });

    };
    useEffect(() => {
        if (search === "") {
            hangldeGetAll();
        } else {
            const result = tempData.filter((voucher) => {
                const values = Object.values(voucher).join().toLowerCase();
                return values.includes(search.toLowerCase());
            });
            setTempData(result);
        }
    }, [search]);
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title">Mã giảm giá</h2>
                </div>

                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            {loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{error}</Message>
                            ) : (
                                <Voucher data={tempData} search={search} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VoucherMain;

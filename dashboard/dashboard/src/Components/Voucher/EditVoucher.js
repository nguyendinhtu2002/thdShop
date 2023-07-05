import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { useQuery } from "react-query";
import * as VoucherService from "../../Services/VoucherService";
import { toast } from "react-toastify";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditVoucher = (props) => {
    const { code } = props;
    const [discount, setDiscount] = useState("");
    const [expiryDays,setExpiryDays] = useState("");

    const dispatch = useDispatch();

    const toastId = React.useRef(null);
    const Toastobjects = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    const handleGetDetailsVoucher = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const res = await VoucherService.getDetilsPay(code, access_token);
        setDiscount(res.discount);
        setExpiryDays(res.expiryDays);
        // setStatus(res.status);
        return res;
    };
    const mutation = useMutationHooks((data) => {
        const { code, access_token, ...rests } = data;
        VoucherService.updatePay(code, rests, access_token);
    });
    const { data, error, isLoading, isError, isSuccess } = mutation;
    const handleUpdate = (e) => {
        e.preventDefault();
        const access_token = JSON.parse(localStorage.getItem("access_token"));

        mutation.mutate({
            id: code,
            discount,
            expiryDays,
            access_token,
        });

        // mutation.mutate(decoded?.id, { phone, name, email, sex })
    };

    const { isLoading: getDetail, data: dataDetail } = useQuery(
        ["products"],
        handleGetDetailsVoucher
    );
    useEffect(() => {
        if (dataDetail) {
        }
    }, [dataDetail]);
    useEffect(() => {
        if (!error && isSuccess) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Thành công!", Toastobjects);
            }
        } else if (error) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error(
                    error.response.data.message,
                    Toastobjects
                );
            }
        }
    }, [code, error, isSuccess]);
    return (
        <>
            <Toast />
            <section className="content-main" style={{ maxWidth: "1200px" }}>
                <form onSubmit={handleUpdate}>
                    <div className="content-header">
                        <Link to="/payment" className="btn btn-danger text-white">
                            Go to payment
                        </Link>
                        <h2 className="content-title">Update Voucher</h2>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Edit now
                            </button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    {/* Error Loading */}
                                    {false && <Message variant="alert-danger">error</Message>}
                                    {/* Update Loading */}

                                    {/* {productSingleStatus && <Loading />} */}

                                    {/* productSingleStatus Loading */}
                                    {getDetail ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="discount" className="form-label">Discount</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="discount"
                                                    required
                                                    value={discount}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="expiryDays" className="form-label">Ngày hết hạn</label>
                                                <input
                                                    type="date"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    id="expiryDays"
                                                    required
                                                    value={expiryDays}
                                                    onChange={(e) => setExpiryDays(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditVoucher;

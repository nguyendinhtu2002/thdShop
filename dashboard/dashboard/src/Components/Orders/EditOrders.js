import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as PayService from "../../Services/OrderSevice";
import { fetchAsyncProductSingle } from "../../features/productSlide/productSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateProductSingle } from "../../features/productSlide/ProductSliceNew";

const EditOrderMain = (props) => {
  const { id } = props;

  const [address, setAddress] = useState("");
  const [quantity, setQuatity] = useState(0);
  console.log(typeof(quantity))
  const [isSucces, setIsSuccess] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
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
  const dispatch = useDispatch();

  const handleGetDetailsProduct = async (id) => {
    
    const res = await PayService.getDetilsPay(id);
    setAddress(res.address_line1);
    setQuatity(res.products[0].quantity);
    setIsSuccess(res.isSucces);
    setIsDelivery(res.isDelivery);
    // dispatch(updateProductSingle({ res }));
  };
  // const { productSingle } = useSelector((state) => state.ProductSignle);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    PayService.updatePay(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = (e) => {
    e.preventDefault();

    mutation.mutate({
      id:id,
      address_line1:address,
      products:[
        {
          quantity:Number(quantity)
        }
      ]
    });

    // mutation.mutate(decoded?.id, { phone, name, email, sex })
  };
  
  useEffect(() => {
    handleGetDetailsProduct(id);
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
  }, [id,error, isSuccess]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/orders" className="btn btn-danger text-white">
              Go to orders
            </Link>
            <h2 className="content-title">Update Orders</h2>
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
                  {false ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={quantity}
                          onChange={(e) => setQuatity(e.target.value)}
                        ></input>
                      </div>
                        <div className="mb-4">
                        <label className="form-label">Status</label>
                        <select
                            className="form-control"
                            value={isSucces}
                            onChange={(e) => setIsSuccess(e.target.value)}
                            >
                            <option value={true}>Hoàn thành</option>
                            <option value={false}>Chưa hoàn thành</option>
                        </select>
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

export default EditOrderMain;

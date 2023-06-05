import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import { fetchAsyncProductSingle } from "../../features/productSlide/productSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { updateProductSingle } from "../../features/productSlide/ProductSliceNew";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = props;

  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const handleGetDetailsProduct = async (id) => {
    const res = await ProductService.getDetilsProduct(id);
    // console.log(res)
    setTitle(res.title);
    setBrand(res.brand);
    setCategory(res.category);
    setDescription(res.description);
    setDiscount(res.discountPercentage);
    setImages(res.images);
    setRate(res.rating);
    setStock(res.stock);
    setPrice(res.price);
    dispatch(updateProductSingle({ res }));
  };
  const { productSingle } = useSelector(
    (state) => state.ProductSignle
  );
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    ProductService.updateProduct(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: id,
      title,
      brand,
      category,
      description,
      discount,
      images,
      rating: rate,
      stock,
      price
    });

    // mutation.mutate(decoded?.id, { phone, name, email, sex })
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    handleGetDetailsProduct(id);

  }, [id]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleUpdate}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
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
                  {productSingle.length===0 ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Brand
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Rating</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={rate}
                          onChange={(e) => setRate(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Stock</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">DiscountPercentage</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        ></input>
                      </div>
                      <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">
                          Images
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFileMultiple"
                          // onChange={handleFileInputChange}
                          multiple
                        />
                        <div className="d-flex mt-3 ">
                          {productSingle.images.map((item) => (
                            <img
                              src={item}
                              width="10%"
                              style={{ marginLeft: "12px" }}
                            />
                          ))}
                        </div>
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

export default EditProductMain;

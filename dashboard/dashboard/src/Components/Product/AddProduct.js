import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import axios from "axios";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as ProductService from "../../Services/ProductService";
import * as CategoryService from "../../Services/CategoryService";

import { fetchAsyncProducts } from "../../features/productSlide/productSlice";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempData, setTempData] = useState([]);
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
  const handleFileInputChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };
  const mutationAddProduct = useMutationHooks((data) => {
    const { ...rests } = data;
    const res = ProductService.createProduct({ ...rests });
    return res;
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      title === "" ||
      category === "" ||
      description === "" ||
      brand === "" ||
      price === 0 ||
      stock === 0 ||
      rate === 0 ||
      discount === 0
    ) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Không được để trống!", Toastobjects);
      }
    } else {
      const uploadedImageUrls = [];

      try {
        for (const image of images) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "Project1");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dgeeyhyzq/image/upload`,
            formData
          );
          uploadedImageUrls.push(response.data.secure_url);
        }
      } catch (error) {
        console.log(error);
      }
      mutationAddProduct.mutate({
        title,
        category,
        description,
        brand,
        price,
        stock,
        rate,
        discount,
        thumbnail: uploadedImageUrls[0],
        images: uploadedImageUrls,
      });
      dispatch(fetchAsyncProducts({}));
    }
  };
  const hangldeGetAll = async () => {
    setLoading(true);
    const resCategory = await CategoryService.getCategory();
    setLoading(false);
    setTempData(resCategory);

    // dispatch(updatePay(res));
  };
  const { error, isLoading, isSuccess, isError } = mutationAddProduct;
  useEffect(() => {
    hangldeGetAll();
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
  }, [error, isSuccess]);
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />} */}
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
                    <select
                      class={"form-select text-capitalize"}
                      aria-label="Default select example"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {/* <option value="1"></option> */}

                      <option value="1">Choose category</option>
                      {tempData.map((item) => (
                        <option value={item.name} className="text-capitalize">
                          {item.name}
                        </option>
                      ))}
                    </select>
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
                      onChange={handleFileInputChange}
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;

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
import { useQuery } from "react-query";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { id } = props;

  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [priceOld, setPriceOld] = useState(0);
  const [priceReal, setPriceReal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [origin, setOrigin] = useState("");
  const [ageTram, setAgeTram] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [soLuongHat, setSoLuongHat] = useState(0);
  const [loaiCharm, setLoaiCharm] = useState("");
  const [menh, setMenh] = useState("");
  const [forGender, setForGender] = useState("");

  const dispatch = useDispatch();

  const handleGetDetailsProduct = async () => {
    const res = await ProductService.getDetilsProduct(id);
    return res;
  };
  const { access_token } = useSelector((state) => state.user);
  const { productSingle } = useSelector((state) => state.ProductSignle);
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    ProductService.updateProduct(id, rests, access_token);
  });
  const { data, error, isLoading, isError, isSuccess } = mutation;
  const handleUpdate = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: id,
      name,
      category,
      description,
      images,
      rate,
      priceOld,
      priceReal,
      material,
      origin,
      quantity,
      old: ageTram,
      use: howToUse,
      soLuongHat,
      type: loaiCharm,
      forGender,
      access_token,
    });

    // mutation.mutate(decoded?.id, { phone, name, email, sex })
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const { isLoading: getDetail, data: dataDetail } = useQuery(
    ["products"],
    handleGetDetailsProduct
  );
  useEffect(() => {
    if (dataDetail) {
      setName(dataDetail.name);
      setCategory(dataDetail.category);
      setDescription(dataDetail.description);
      setImages(dataDetail.images);
      setRate(dataDetail.rate);
      setPriceOld(dataDetail.priceOld);
      setPriceReal(dataDetail.priceReal);
      setQuantity(dataDetail.quantity);
      if (dataDetail.material) {
        setMaterial(dataDetail.material);
      }
      if (dataDetail.origin) {
        setOrigin(dataDetail.origin);
      }
      setAgeTram(dataDetail.old);
      setHowToUse(dataDetail.use);
      if (dataDetail.count) {
        setSoLuongHat(dataDetail?.count[0]);
      }
      if (dataDetail.type) {
        setLoaiCharm(dataDetail.type);
      }
      //   setMenh(dataDetail.menh);
      setForGender(dataDetail.slug);
      setImages(dataDetail.images);
    }
  }, [dataDetail]);

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
                  {getDetail ? (
                    <Loading />
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          readOnly
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
                        <label className="form-label">Price Old</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={priceOld}
                          onChange={(e) => setPriceOld(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Price New</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={priceReal}
                          onChange={(e) => setPriceReal(e.target.value)}
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
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          required
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        ></input>
                      </div>
                      <div className={material != "" ? "mb-4" : "d-none"}>
                        <label className="form-label">Material</label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                        ></input>
                      </div>
                      <div className={origin != "" ? "mb-4" : "d-none"}>
                        <label className="form-label">Origin</label>
                        <select
                          className="form-select"
                          onChange={(e) => setOrigin(e.target.value)}
                        >
                          <option value="" selected disabled>
                            None
                          </option>
                          <option
                            value="vietnam"
                            selected={origin == "Việt Nam"}
                          >
                            Việt Nam
                          </option>
                          <option
                            value="philippines"
                            selected={origin == "Philippines"}
                          >
                            Philippines
                          </option>
                          <option
                            value="indonesia"
                            selected={origin == "Indonesia"}
                          >
                            Indonesia
                          </option>
                          <option value="indonesia" selected={origin == "Lào"}>
                            Lào
                          </option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Tuổi Trầm</label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          value={ageTram}
                          onChange={(e) => setAgeTram(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">How To Use</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          value={howToUse}
                          onChange={(e) => setHowToUse(e.target.value)}
                        ></textarea>
                      </div>
                      <div className={soLuongHat !== 0 ? "mb-4" : "d-none"}>
                        <label className="form-label">Số lượng hạt</label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          value={soLuongHat}
                          onChange={(e) => setSoLuongHat(e.target.value)}
                        ></input>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Loại Charm</label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          value={loaiCharm}
                          onChange={(e) => setLoaiCharm(e.target.value)}
                        ></input>
                      </div>
                      {/* <div className="mb-4 ">
                        <label className="form-label">
                          Choose Type Category
                        </label>
                        <div className="d-flex">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Default radio
                            </label>
                          </div>
                          <div class="form-check mx-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Default checked radio
                            </label>
                          </div>
                        </div>
                      </div> */}
                      <div
                        className={
                          description === "Vòng trầm Thiên Mộc Hương"
                            ? "mb-4"
                            : "d-none"
                        }
                      >
                        <label className="form-label">Title</label>
                        <select
                          className="form-select"
                          onChange={(e) => setMenh(e.target.value)}
                        >
                          <option value="" disabled>
                            None
                          </option>
                          <option value="Kim" selected={menh === "Kim"}>
                            Vòng tay cho nữ
                          </option>
                          <option value="Mộc" selected={menh === "Mộc"}>
                            Vòng tay cho nam
                          </option>
                          <option value="Thuỷ" selected={menh === "Thuỷ"}>
                            Mệnh Mộc
                          </option>
                          <option value="Thuỷ" selected={menh === "Thuỷ"}>
                            Mệnh Thủy
                          </option>
                          <option value="Hỏa" selected={menh === "Hỏa"}>
                            Mệnh Hỏa
                          </option>
                          <option value="Thổ" selected={menh === "Thổ"}>
                            Mệnh Thổ
                          </option>
                        </select>
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
                          {images.map((item) => (
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

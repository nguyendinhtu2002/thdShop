import React, {useState, useEffect} from "react";
import Toast from "./../LoadingError/Toast";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import {fetchAsyncProductSingle} from "../../features/productSlide/productSlice";
import {useMutationHooks} from "../../hooks/useMutationHooks";
import {updateProductSingle} from "../../features/productSlide/ProductSliceNew";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditProductMain = (props) => {
    const {id} = props;

    const [title, setTitle] = useState("");
    const [rate, setRate] = useState(0);
    const [priceOld, setPriceOld] = useState(0);
    const [priceReal, setPriceReal] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    const [material, setMaterial] = useState("");
    const [origin, setOrigin] = useState("");
    const [ageTram, setAgeTram] = useState("");
    const [howToUse, setHowToUse] = useState("");
    const [soLuongHat, setSoLuongHat] = useState("");
    const [loaiCharm, setLoaiCharm] = useState("");
    const [menh, setMenh] = useState("");
    const [forGender, setForGender] = useState("");

    const dispatch = useDispatch();

    const handleGetDetailsProduct = async (id) => {
        const res = await ProductService.getDetilsProduct(id);
        // console.log(res)
        setTitle(res.title);
        setCategory(res.category);
        setDescription(res.description);
        setImages(res.images);
        setRate(res.rating);
        setPriceOld(res.priceOld);
        setPriceReal(res.priceReal);
        setMaterial(res.material);
        setOrigin(res.origin);
        setAgeTram(res.ageTram);
        setHowToUse(res.howToUse);
        setSoLuongHat(res.soLuongHat);
        setLoaiCharm(res.loaiCharm);
        setMenh(res.menh);
        setForGender(res.forGender);
        dispatch(updateProductSingle({res}));
    };
    const {productSingle} = useSelector(
        (state) => state.ProductSignle
    );
    const mutation = useMutationHooks((data) => {
        const {id, access_token, ...rests} = data;
        ProductService.updateProduct(id, rests, access_token);
    });
    const {data, error, isLoading, isError, isSuccess} = mutation;
    const handleUpdate = (e) => {
        e.preventDefault();

        mutation.mutate({
            id: id,
            title,
            category,
            description,
            images,
            rating: rate,
            priceOld,
            priceReal,
            material,
            origin,
            ageTram,
            howToUse,
            soLuongHat,
            loaiCharm,
            menh,
            forGender,
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
            <Toast/>
            <section className="content-main" style={{maxWidth: "1200px"}}>
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
                                    {productSingle.length === 0 ? (
                                        <Loading/>
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
                                                    value={priceNew}
                                                    onChange={(e) => setPriceNew(e.target.value)}
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
                                                <label className="form-label">Material</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    value={material}
                                                    onChange={(e) => setMaterial(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Origin</label>
                                                <select className="form-select"  onChange={(e) => setOrigin(e.target.value)}>
                                                    <option value="" selected disabled>None</option>
                                                    <option value="vietnam" selected={origin=="vietnam"}>Việt Nam
                                                    </option>
                                                    <option value="philippines" selected={origin=="philippines"}>Philippines
                                                    </option>
                                                    <option value="indonesia" selected={origin=="indonesia"}>Indonesia
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
                                                <input
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="form-control"
                                                    value={howToUse}
                                                    onChange={(e) => setHowToUse(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className="mb-4">
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

                                            <div className="mb-4">
                                                <label className="form-label">Mệnh</label>
                                                <select className="form-select"
                                                        onChange={(e) => setMenh(e.target.value)}>
                                                    <option value="" disabled>
                                                        None
                                                    </option>
                                                    <option value="Kim" selected={menh === "Kim"}>
                                                        Kim
                                                    </option>
                                                    <option value="Mộc" selected={menh === "Mộc"}>
                                                        Mộc
                                                    </option>
                                                    <option value="Thuỷ" selected={menh === "Thuỷ"}>
                                                        Thuỷ
                                                    </option>
                                                    <option value="Hỏa" selected={menh === "Hỏa"}>
                                                        Hỏa
                                                    </option>
                                                    <option value="Thổ" selected={menh === "Thổ"}>
                                                        Thổ
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label">Cho giới tính</label>
                                                <select className="form-select" onChange={(e) => setForGender(e.target.value)}>
                                                    <option value="" selected disabled>None</option>
                                                    <option value="Nam" selected={forGender=="Nam"}>Nam
                                                    </option>
                                                    <option value="Nữ" selected={forGender=="Nữ"}>Nữ
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
                                                    {productSingle.images.map((item) => (
                                                        <img
                                                            src={item}
                                                            width="10%"
                                                            style={{marginLeft: "12px"}}
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

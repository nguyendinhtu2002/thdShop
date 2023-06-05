import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/LoadingError";
import * as ProductService from "../../Services/ProductService";
import Table from "../Table/Table";
import { toast } from "react-toastify";
import Toast from "./../LoadingError/Toast";

const MainProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const productList = useSelector((state) => state.products);
  // const { productsStatus } = productList;
  const [tempData, setTempData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [search, SetSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);

  // const productDelete = useSelector((state) => state.productDelete);
  // const { error: errorDelete, success: successDelete } = productDelete;
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
  const handleDelete = async (id) => {
    if (id) {
      setShowModal(true);

      await ProductService.deleteProduct(id)
        .then((res) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Thành công!", Toastobjects);
          }
          hangldeGetAll();
          window.location.reload();
        })
        .catch((error) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, Toastobjects);
          }
        });
    }
    handleCloseModal();
  };
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.thumbnail}
          alt={row.title}
          class="img-thumbnail"
          style={{ maxWidth: "50%" }}
        />
      ),
    },
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "DiscountPercentage",
      selector: (row) => row.discountPercentage,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link
            to={`/product/${row._id}/edit`}
            // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Edit</button>
          </Link>
          <Link
            style={{ marginLeft: "15px" }}
            onClick={() => handleDelete(row._id)}
            // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Delete</button>
          </Link>
        </>
      ),
    },
  ];
  const hangldeGetAll = async () => {
    setLoading(true);
    const resProduct = await ProductService.getAll();
    setLoading(false);
    setTempData(resProduct);

    // dispatch(updatePay(res));
  };
  useEffect(() => {
    if (search === "") {
      hangldeGetAll();
    } else {
      const result = tempData.filter((idProduct) => {
        return idProduct.id.toString().match(search.toLowerCase());
      });
      console.log(result);
      setTempData(result);
    }
  }, [search]);

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products</h2>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <div className="row">
              
                <Table data={tempData} columns={columns} sub={true} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;

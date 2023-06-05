import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../LoadingError/LoadingError";
import * as CategoryService from "../../Services/CategoryService";
import Table from "../Table/Table";
import { toast } from "react-toastify";
import Toast from "./../LoadingError/Toast";

const MainCategory = () => {
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
  const handleDelete = async (id) => {
    if (id) {
      await CategoryService.deleteCategory(id)
        .then((res) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Thành công!", Toastobjects);
          }
          hangldeGetAll();
          setTimeout(() => {
            window.location.reload();
          }, 30000);
        })
        .catch((error) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(error, Toastobjects);
          }
        });
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row._id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
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
    const resCategory = await CategoryService.getCategory();
    setLoading(false);
    setTempData(resCategory);

    // dispatch(updatePay(res));
  };
  useEffect(() => {
    hangldeGetAll();
  }, []);

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Category</h2>
          <div>
            <Link to="/addcategory" className="btn btn-primary">
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

export default MainCategory;

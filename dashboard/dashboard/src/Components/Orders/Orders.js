import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table/Table";
import * as OrderService from "../../Services/OrderSevice";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const Orders = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState("");
  const [tempData, setTempData] = useState([]);

  const [error, setError] = useState("");
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
  const hangldeGetAll = async () => {
    setLoading(true);
    await OrderService.getPay()
      .then((res) => {
        setLoading(false);
        setTempData(res);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleDelete = async (id) => {
    if (id) {
      await OrderService.deletePay(id)
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
  };
  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.products[0].thumbnail}
          alt={row.products[0].title}
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
      name: "ID User",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Address ",
      selector: (row) => row.address_line1,
    },
    {
      name: "Product",
      selector: (row) => row.products[0].title,
    },
    {
      name: "quantity",
      selector: (row) => row.products[0].quantity,
    },
    {
      name: "Total Price",
      selector: (row) => row.products[0].totalPrice,
    },
    {
      name: "DiscountedPrice",
      selector: (row) => row.products[0].discountedPrice,
    },
    {
      name: "Thanh Toán",
      selector: (row) => (row.isSucces ? "Đã Thanh toán" : "Chưa thanh toán"),
    },
    {
      name: "Trạng Thái Vận Chuyển",
      selector: (row) => (row.isShip ? "Đã xuất kho" : "Chưa xuất kho"),
    },
    {
      name: "Trạng Thái Giao Hàng",
      selector: (row) =>
        row.isDelivery ? "KH đã nhận hàng" : "KH chưa nhận hàng",
    },
    {
      name: "Trả lại",
      selector: (row) => (row.isReturn ? "Có" : "Không"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            to={`/orders/${row._id}/edit`}
            style={{ paddingRight: "5px" }}
            // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(row._id)}
            className="btn btn-primary "
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Toast />
      <Table data={data} columns={columns} sub={true} />
    </>
  );
};

export default Orders;

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
  console.log(data)
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
  const options = {
    maximumFractionDigits: 0,
  };
  const formattedAmount = (amount, options) => {
    return amount.toLocaleString(undefined, options);
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
      name: "Ảnh",
      selector: (row) => (
        <img
          src={row.order.products[0].image[0]}
          // alt={row.products[0].title}
          class="img-thumbnail"
          style={{ maxWidth: "50%" }}
        />
      ),
    },
  
    {
      name:"Sản phẩm",
      selector: (row) => row.order.products[0].name,
    },
    {
      name: "Địa chỉ giao hàng",
      selector: (row) => row.order.customerAddress,
      
    },
    {
      name: "Số lượng",
      selector: (row) => row.order.products[0].quantityOrder,
    },
    {
      name: "Tổng tiền",
      selector: (row) => formattedAmount(row.order.totalPrice),
    },
    {
      name: "Trạng thái",
      selector: (row) => row.order.status,
    },

    {
      name: "Hành động",
      selector: (row) => (
        <div className="d-flex" style={{ width: "450px" }}>
          <Link
            to={`/orders/${row.order._id}/edit`}
            style={{ marginRight: "5px" }}
            // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Sửa</button>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(row.order._id)}
            className="btn btn-danger"

          >
            Xóa
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

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table/Table";
import * as UserService from "../../Services/UserService";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const Users = (props) => {
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
    await UserService.getAll()
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
      await UserService.deleteUser(id)
        .then((res) => {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Thành công!", Toastobjects);
          }
          hangldeGetAll();
          window.location.reload()

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
      name: "Full Name",
      selector: (row) => row.firstName + " " + row.lastName,
    },

    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "IsAdmin",
      selector: (row) => (row.isAdmin ? "Admin" : "Người dùng"),
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="d-flex " style={{ width: "450px" }}>
          <Link
            to={`/users/${row._id}/edit`}
            style={{ paddingRight: "5px" }}
            // className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
          >
            <button className="btn btn-primary">Edit</button>
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger "
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
    // <DataTable
    //   columns={columns}
    //   data={filteredItems}
    //   pagination
    //   fixedHeader
    //   fixedHeaderScrollHeight="450px"
    //   progressComponent
    //   selectableRows
    //   selectableRowsHighlight
    //   subHeader
    //   subHeaderComponent={
    //     subHeaderComponent
    //   }
    // />
  );
};

export default Users;

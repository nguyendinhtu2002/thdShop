import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/LoadingError";
import { useSelector } from "react-redux";
import * as UserService from "../../Services/UserService";
import { error } from "jquery";
import Users from "./User";
const UserMain = () => {
  //   const orderList = useSelector((state) => state.orderList);
  //   const { loading, error, orders } = orderList;
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [tempData, setTempData] = useState([]);
  const [search, SetSearch] = useState("");

  const hangldeGetAll = async (access_token) => {
    setLoading(true);
    await UserService.getAll(access_token)
      .then((res) => {
        setLoading(false);
        setTempData(res);
      })
      .catch((error) => {
        setError(error);
      });

    // dispatch(updatePay(res));
  };
  useEffect(() => {
    if (search === "") {
      const access_token = localStorage.getItem("access_token");

      hangldeGetAll(JSON.parse(access_token));
    } else {
      const result = tempData.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Người dùng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Users data={tempData} search={search} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserMain;

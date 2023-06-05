import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomModal from "../Modal/Modal";
import Button from "./Button";
import CustomSelect from "./Select";
import { useLocation } from "react-router-dom";

function Table(props) {
  const { data, columns, sub } = props;
  const [search, setSearch] = useState("");
  const [datas, setTempData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const uniqueCategories = data.reduce((acc, product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const customHeader = (
    <div>
      <span>Custom Header</span>
      <CustomSelect onChange={handleSelectChange} />
    </div>
  );

  useEffect(() => {
    if (search === "") {
      setTempData(data);
    } else {
      const result = datas.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(search.toLowerCase());
      });
      setTempData(result);
    }
  }, [search]);
  useEffect(() => {
    if (selectedOption !== null) {
      const result = data.filter((product) => {
        const values = Object.values(product).join().toLowerCase();
        return values.includes(selectedOption.toLowerCase());
      });
      setTempData(result);
    }
  }, [selectedOption]);
  return (
    <>
      {sub ? (
        <DataTable
          columns={columns}
          data={datas}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          progressComponent
          selectableRows
          selectableRowsHighlight
          //   actions={actionsMemo}
          subHeader
          subHeaderComponent={
            <div className="d-flex ">
              <select
                class={
                  location.pathname === "/products"
                    ? "form-select  position-absolute top-0 start-0 w-10"
                    : "d-none"
                }
                aria-label="Default select example"
                style={{ width: "10%" }}
                onChange={handleSelectChange}
              >
                {/* <option value="1"></option> */}

                <option value="1">Choose category</option>
                {uniqueCategories.map((item) => (
                  <option value={item} className="text-capitalize">{item}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Search here"
                className="form-control w-25 position-absolute top-0 end-0"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          }
        ></DataTable>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          progressComponent
          selectableRows
          selectableRowsHighlight
        />
      )}
    </>
  );
}

export default Table;

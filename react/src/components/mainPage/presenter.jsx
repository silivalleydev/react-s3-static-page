import axios from "axios";
import React from "react";
import { columns, rows } from "../../dummy"

const Presenter = (props) => {
  return (
    <div>
      <button onClick={() => {
        axios.post("http://localhost:8080/export/excel", {
          columns,
          rows,
          filename: "excelData_demo"
        })
      }}>Excel Export</button>
    </div>
  );
};

export default Presenter;

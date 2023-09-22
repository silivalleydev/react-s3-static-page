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
      <button onClick={() => {
        axios.post("http://localhost:8080/export/excel_db_data", {
          emailto: "steve@diilabs.co.kr",
          title: "Hello Export Excel",
          content: "excel file",
          columns: [
            {header: '이름', key: 'name'},
            {header: '전화번호', key: 'phone'},
          ],
          query: "SELECT * FROM member where phone=? and name=?",
          where: ['01022222222', 'jack'],
          filename: "excelData_demo"
        })
      }}>Excel SQL Export</button>
      <button onClick={() => {
        axios.post("http://localhost:8080/export/excel_db_data", {
          emailto: "demo@gmail.com",
          title: "Hello Export Excel",
          content: "excel file",
          query: "SELECT * FROM member where phone=? and name=?",
          where: ['01022222222', 'jack'],
          filename: "excelData_demo"
        })
      }}>Excel Only SQL Export</button>
    </div>
  );
};

export default Presenter;

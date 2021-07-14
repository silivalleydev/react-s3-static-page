import React from "react";
import Presenter from "./presenter";
import axios from "axios";

const Container = (props) => {
  const handleGet = () => {
    axios
      .get("http://localhost:8080/user?id=1")
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {});
  };

  const handlePost = () => {
    axios
      .post("http://localhost:8080/user", {
        name: "김길동",
        age: 13,
      })
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {});
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:8080/user?id=9")
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {});
  };
  const handleUpdate = () => {
    axios
      .put("http://localhost:8080/user", {
        id: 1,
        name: "홍길자",
        age: 30,
      })
      .then((rs) => {
        console.log(rs);
      })
      .catch((err) => {});
  };
  return (
    <Presenter
      {...props}
      handleGet={handleGet}
      handlePost={handlePost}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  );
};

export default Container;

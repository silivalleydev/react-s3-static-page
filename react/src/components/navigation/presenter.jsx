import React from "react";
import { Link } from "react-router-dom";

const Presenter = (props) => {

  return (
    <>
    <div style={{ backgroundColor: "lightgray" }}>
      <Link to="/signIn">로그인</Link>
    </div>
    </>
  );
};

export default Presenter;

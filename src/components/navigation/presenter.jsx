import React from "react";
import { Link } from "react-router-dom";

const Presenter = (props) => {

  return (
    <>
    <div style={{ backgroundColor: "lightgray" }}>
      <Link to="/signIn">Sign in</Link>
      <Link to="/signUp">Sign up</Link>
    </div>
    </>
  );
};

export default Presenter;

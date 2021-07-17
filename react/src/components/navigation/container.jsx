import React from "react";
import Presenter from "./presenter";

const Container = (props) => {

  const {
      location = {}
  } = props;

  return (
    <>
    {location.pathname !== "/signIn" &&
    <Presenter
      {...props}
    />}
    </>
  );
};

export default Container;

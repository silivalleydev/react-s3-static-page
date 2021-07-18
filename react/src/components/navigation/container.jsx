import React, { useEffect } from "react";
import Presenter from "./presenter";

const Container = (props) => {

  const {
      location = {},
      history = {}
  } = props;

  useEffect(() => {
  }, [location.pathname])

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

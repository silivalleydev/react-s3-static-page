import React, { useEffect } from "react";
import { verifyAccessToken } from "../../common/function/commonFunction";
import Presenter from "./presenter";

const Container = (props) => {

  const {
      location = {},
      history = {}
  } = props;

  useEffect(() => {
    verifyAccessToken();
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

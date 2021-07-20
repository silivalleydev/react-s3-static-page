import axios from "axios";
import React from "react";
import { encryptionData } from "../../../common/function/commonFunction";
import { API_SIGN_IN, HOST } from "../../../env";
import Presenter from "./presenter";

const Container = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = async () => {
    try {
      const encrypted = encryptionData(email, password);
      const result = await axios.post(`${HOST + API_SIGN_IN}`, null, {
        headers: {
          "Authorization": `Basic ${encrypted}`
        }
      });

      console.log(result);
    } catch (error) {
      console.log("Sign In Failed");
    }
  }
  return (
    <Presenter
      {...props}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignIn={handleSignIn}
    />
  );
};

export default Container;

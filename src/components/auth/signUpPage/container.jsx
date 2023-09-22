import axios from "axios";
import React from "react";
import { encryptionData } from "../../../common/function/commonFunction";
import { API_SIGN_UP, HOST } from "../../../env";
import Presenter from "./presenter";


const Container = (props) => {

  const {
    history
  } = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = async () => {
    try {
      const encrypted = encryptionData(email, password);
      const result = await axios.post(`${HOST + API_SIGN_UP}`, null, {
        headers: {
          "Authorization": `Basic ${encrypted}`
        }
      });

      console.log(result);
      history.push("/");
    } catch (error) {
      console.log("Sign Up Failed");
    }
  }

  return (
    <Presenter
      {...props}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
    />
  );
};

export default Container;

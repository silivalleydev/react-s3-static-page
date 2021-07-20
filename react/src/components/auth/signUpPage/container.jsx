import axios from "axios";
import React from "react";
import { API_SIGN_UP, HOST } from "../../../env";
import Presenter from "./presenter";
import CryptoJS from "crypto-js";

const encryptionData = (email, password) => {
  const secretKey = 'Basic';

  console.log('original:', `${email}:${password}`);
  const encrypted = CryptoJS.AES.encrypt(`${email}:${password}`, secretKey).toString();
  console.log('encrypt:', encrypted);

  return encrypted;
}

const Container = (props) => {

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

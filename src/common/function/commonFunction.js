import axios from "axios";
import CryptoJS from "crypto-js";
import { API_REFRESH, API_VERIFY, HOST } from "../../env";

export const encryptionData = (email, password) => {
  const secretKey = 'Basic';

  console.log('original:', `${email}:${password}`);
  const encrypted = CryptoJS.AES.encrypt(`${email}:${password}`, secretKey).toString();
  console.log('encrypt:', encrypted);

  return encrypted;
}

const verifyRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const verifyInfo = await axios.post(HOST + API_REFRESH, null, {
      headers: {
        "Authorization": `Basic ${refreshToken}`
      }
    })
    if (verifyInfo.data.accessToken) {
      localStorage.setItem("access_token", verifyInfo.data.accessToken)
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("VERITY REFRESH TOKEN Failed");
    return false;
  }

}

export const verifyAccessToken = async () => {
  const existAccessToken = localStorage.getItem("access_token");
  try {
    const verifyInfo = await axios.get(HOST + API_VERIFY, {
      headers: {
        "Authorization": `Basic ${existAccessToken}`
      }
    })

    console.log("/???",verifyInfo)
    if (verifyInfo.data.statusCode === "200") {
      return true;
    } else {
      return verifyRefreshToken();
    }
  } catch (error) {
    console.log("VERITY TOKEN Failed");
    return false;
  }
}
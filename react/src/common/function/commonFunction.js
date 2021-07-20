import CryptoJS from "crypto-js";

export const encryptionData = (email, password) => {
  const secretKey = 'Basic';

  console.log('original:', `${email}:${password}`);
  const encrypted = CryptoJS.AES.encrypt(`${email}:${password}`, secretKey).toString();
  console.log('encrypt:', encrypted);

  return encrypted;
}
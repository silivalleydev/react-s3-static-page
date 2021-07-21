const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const ACCESS_TOKEN_SECRET="d7d34917fbd11fdd89357decfb506b5e563e418bf7b136d30436dfa0dddbd4a6e318099c8e4918b87fd8e47e23196c441a5c892a6895d6061e27f89ed1ba19d6"
const REFRESH_TOKEN_SECRET="3a13ce20d9e44269e1a01f31e6cb67b6f200450ecc7cf09c3d0a199e512037422145d7727fa874e128bfbbc198b06e99ae1f6e24b57e8cd598102b61bffa8e69"

module.exports = {
    generateAccessToken: (id) => {
        return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        })
        // generateRefreshToken: (id) => {
        // return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
        //     expiresIn: "180 days",
        // })
    },
    generateRefreshToken: (id) => {
    return jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "180 days",
    });
    },
    encryptionData: (data) => {
        const secretKey = "Basic";

        // encrypt
        const encrypted = CryptoJS.AES.encrypt(`${data}`, secretKey).toString();
        console.log("encrypt:", encrypted);

        return encrypted;
    },
    dycryptionData: (encrypted) => {
    const secretKey = "Basic";

    const bytes = CryptoJS.AES.decrypt(`${encrypted}`, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted:", decrypted);

    return decrypted;
    }
}

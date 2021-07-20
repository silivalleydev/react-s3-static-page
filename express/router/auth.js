const express = require("express");
const router = express.Router();
const connection = require("../connection");
const CryptoJS = require("crypto-js");

const encryptionData = (data) => {
  const secretKey = "Basic";

  // encrypt
  const encrypted = CryptoJS.AES.encrypt(`${data}`, secretKey).toString();
  console.log("encrypt:", encrypted);

  return encrypted;
};

const dycryptionData = (encrypted) => {
  const secretKey = "Basic";

  const bytes = CryptoJS.AES.decrypt(`${encrypted}`, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  console.log("decrypted:", decrypted);

  return decrypted;
};

router.post("/signup", (req, res) => {
  console.log("data", req.headers.authorization);
  const authInfo = req.headers.authorization;

  if (authInfo) {
    const dycrypted = dycryptionData(authInfo.split(" ")[1]);
    console.log(dycrypted);
    if (dycrypted) {
      const splited = dycrypted.split(":");
      const email = splited[0];
      const password = encryptionData(splited[1]);
      const SQL =
        "INSERT INTO member(email, password, register_at) VALUES(?,?,?)";
      connection.query(
        SQL,
        [email, password, "2021-02-21 12:00:00"],
        function (err, result, fields) {
          if (err) {
            return res.status(400).json({
              status: "error",
              error: "req body cannot be empty",
            });
          } else {
            return res.status(200).json({
              status: "success"
            });
          }
        }
      );
    }
  } else {
    return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
    }); 
  }
});

router.post("/signin", (req, res) => {
      console.log("data", req.headers.authorization);
  const authInfo = req.headers.authorization;

  if (authInfo) {
    const dycrypted = dycryptionData(authInfo.split(" ")[1]);
    console.log(dycrypted);
    if (dycrypted) {
      const splited = dycrypted.split(":");
      const email = splited[0];
      const password = splited[1];
      const SQL = "SELECT * FROM member where email=?";

      connection.query(
        SQL,
        [email],
        function (err, result = [], fields) {
          if (err) {
            return res.status(400).json({
              status: "error",
              error: "req body cannot be empty",
            });
          } else {
            console.log("결과",result);
            if (result.length > 0) {
                const selectedRs = result[0] || {};

                if (password === dycryptionData(selectedRs.password)) {
                    return res.status(200).json({
                        status: "success",
                        access_token: "sdsdcfbew"
                    });     
                } else {
                    return res.status(200).json({
                        status: "success",
                        message: "incorrect email or password"
                    });
                }
            } else {
                return res.status(200).json({
                  status: "success",
                  message: "incorrect email or password"
                });
            }
          }
        }
      );
    }
  } else {
    return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
    }); 
  }
});

module.exports = router;

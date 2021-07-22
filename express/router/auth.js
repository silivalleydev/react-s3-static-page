const express = require("express");
const router = express.Router();
const connection = require("../connection");
const { dycryptionData, encryptionData, generateAccessToken, generateRefreshToken, verifyAccessToken } = require("../util/utilFunction");

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
                      const accessToken = generateAccessToken(email);
                      const refreshToken = generateRefreshToken(email);

                    return res.status(200).json({
                        status: "success",
                        accessToken,
                        refreshToken
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

// access token을 refresh token 기반으로 재발급
router.post("/refresh", async (req, res) => {
    let authHeader = req.headers.authorization;
    let refreshToken = authHeader && authHeader.split(" ")[1];
    if (!refreshToken) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    const verifyResult = await verifyAccessToken(refreshToken, "refresh");
    if (verifyResult.id) {
      const accessToken = generateAccessToken(verifyResult.id);
      res.json({
        statusCode: "200",
        status: "success",
        accessToken
      });
    } else {
      res.json({
        statusCode: "403",
        status: "fail"
      });
    }
});

// access token 유효성 확인을 위한 예시 요청
router.get("/verify",async (req, res) => {

    let authHeader = req.headers.authorization;
    let token = authHeader && authHeader.split(" ")[1];
      console.log(authHeader)
    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    const verifyResult = await verifyAccessToken(token, "access");
    if (verifyResult.id) {
      res.json({
        statusCode: "200",
        status: "success"
      });
    } else {
      res.json({
        statusCode: "403",
        status: "fail"
      });
    }
    console.log("결과????", verifyResult.id);
});

module.exports = router;

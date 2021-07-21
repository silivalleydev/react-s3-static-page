const express = require("express");
const router = express.Router();
const connection = require("../connection");
const { dycryptionData, encryptionData, generateAccessToken, generateRefreshToken } = require("../util/utilFunction");




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

const authenticateAccessToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    });
};

// access token을 refresh token 기반으로 재발급
router.post("/refresh", (req, res) => {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (error, user) => {
            if (error) return res.sendStatus(403);

            const accessToken = generateAccessToken(user.id);

            res.json({ accessToken });
        }
    );
});

// access token 유효성 확인을 위한 예시 요청
router.get("/user", authenticateAccessToken, (req, res) => {
    console.log(req.user);
    res.json(users.filter((user) => user.id === req.user.id));
});

module.exports = router;

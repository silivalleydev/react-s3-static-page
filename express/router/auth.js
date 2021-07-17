const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/signup', (req, res) => {
    console.log('data', req.body)
    const body = req.body || {};

    if (body) {
        const SQL = "INSERT INTO member(email, password, register_at) VALUES(?,?,?)";
        connection.query(SQL, [body.email, body.password, body.register_at], function (err, result, fields) {
            if (err) {
                return res.status(400).json({
                    status: 'error',
                    error: 'req body cannot be empty',
                });

            } else {
                return res.status(200).json({
                    status: 'succes',
                    data: req.body,
                })

            }
        })
    } else {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    }
})

router.post('/signin', (req, res) => {
    console.log('data', req.body)
    const body = req.body || {};
    if (body) {
           const SQL = "SELECT * FROM user where id=?";
            connection.query(SQL, [body.email], function (err, result, fields) {
            if (err) {
                return res.status(400).json({
                    status: 'error',
                    error: 'req body cannot be empty',
                });

            } else {
                return res.status(200).json({
                    status: 'succes',
                    data: req.body,
                })

            }
        })
    } else {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    }
})

module.exports = router;
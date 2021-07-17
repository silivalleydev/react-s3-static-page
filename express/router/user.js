const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/all', (req, res) => {
    // connection.connect();
    const SQL = "SELECT * FROM user";
    connection.query(SQL, function (err, result, fields) {
        if (err) {
            res.send({
                status: "SELECT FAIL"
            });
            console.log(err)

        } else {
            res.send(result)
            console.log(result)

        }
    })
})
router.get('/', (req, res) => {
    // connection.connect();
    if (req.query.id) {
        const SQL = "SELECT * FROM user where id=?";
        connection.query(SQL, [req.query.id], function (err, result, fields) {
            if (err) {
                res.send({
                    status: "SELECT FAIL"
                });
                console.log(err)
    
            } else {
                res.send(result)
                console.log(result)
    
            }
        })
    } else {
        res.send("USER SELECT FAIL");
    }
})

router.post('/', (req, res) => {
    console.log('data', req.body)
    const info = req.body || {};

    if (info) {
        const SQL = "INSERT INTO user(name, age) VALUES(?,?)";
        connection.query(SQL, [info.name, info.age], function (err, result, fields) {
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

router.put('/', (req, res) => {
    console.log('data', req.body)
    const info = req.body || {};

    if (info) {
        const SQL = "UPDATE user SET name=?, age=? where id = ?";
        connection.query(SQL, [info.name, info.age, info.id], function (err, result, fields) {
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

router.delete('/', (req, res) => {
    // connection.connect();
    if (req.query.id) {
        const SQL = "DELETE FROM user where id=?";
        connection.query(SQL, [req.query.id], function (err, result, fields) {
            if (err) {
                res.send({
                    status: "DELETE FAIL"
                });
                console.log(err)
    
            } else {
                res.send(result)
                console.log(result)
            }
        })
    } else {
        res.send("USER SELECT FAIL");
    }
})


module.exports = router;
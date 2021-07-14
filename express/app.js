const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const connectInfo = require('./env');
const bodyParser = require('body-parser');
const app = express()
const port = 8080

const connection = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    password: connectInfo.password,
    database: connectInfo.database
})

app.use(cors());

app.use(bodyParser.json());

app.get('/users', (req, res) => {
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
app.get('/user', (req, res) => {
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

app.post('/user', (req, res) => {
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

app.put('/user', (req, res) => {
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

app.delete('/user', (req, res) => {
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

// app.post('/', function (req, res) {
//     res.send('Got a POST request');
// });

// app.get('/ps/:id', (req, res) => {
//     console.log('param', req.params)
//     const json = {
//         name: "pathparam",
//         age: 43,
//         say: "id"
//     }
//     res.send(json)
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

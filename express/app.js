const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
// const authRouter = require('./router/auth');
const exportRouter = require('./router/export');
const app = express()
const port = 8080

app.use(cors());
app.use(express.json({
    limit : "50mb"
}));
app.use(express.urlencoded({
    limit:"50mb",
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello Express!")
})

// app.use('/auth', authRouter);
app.use('/export', exportRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

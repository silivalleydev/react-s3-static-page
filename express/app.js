const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const authRouter = require('./router/auth');
const app = express()
const port = 8080

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello Express!")
})

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors');
const database = require("./config/database")
const routerv1 = require("./API/V1/routers/Amainrouter")

dotenv.config();
database.connect()

const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

routerv1(app)

app.listen(port,() => {
    console.log("ok ok")
})
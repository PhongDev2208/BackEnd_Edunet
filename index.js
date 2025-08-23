const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");
const routerv1 = require("./API/V1/routers/main.router");

dotenv.config();
database.connect();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

routerv1(app);
app.listen(port, () => {
  console.log("ok ok");
});

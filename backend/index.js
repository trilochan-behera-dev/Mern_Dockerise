const express = require("express");
const app = express();
const mongoDB = require("./database/connection");
const userRouter = require("./router/userRouter");
const dotenv = require("dotenv");
dotenv.config();
mongoDB();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(  `app is  running in port http://localhost:${port}`);
});

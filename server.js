require("dotenv").config();
const express = require("express");
const mailRouter = require("./src/routes/mail");
const messageRouter = require("./src/routes/message");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to payreminder");
});

app.use("/mail", mailRouter);
app.use("/message", messageRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

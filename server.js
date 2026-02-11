const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = require('./routes/router');
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/',router)
const port = process.env.PORT;
const connection = require('./config/conn');

connection;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
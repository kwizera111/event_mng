const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = require('./routes/router');
const session = require('express-session');
const passport = require('passport');

const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret:'YourSecretKey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/',router)  
require("./config/passport");
const port = process.env.PORT;
const connection = require('./config/conn');

connection;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
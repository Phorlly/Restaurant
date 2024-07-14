const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.json());

module.exports = { app, port, secretKey };

const cors = require("cors");
const express = require('express');

const context = require('./configures/datastore');
require("dotenv").config();


const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.json());

app.listen(port, () => {
    console.log(`Sever is running on http://localhost:${port}`);
    context();
})
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"})

//mongo connection
 require("./db/conn")

 app.use(express.json());

//to link router files to make root
app.use(require("./router/auth"))

const PORT = process.env.PORT;



 //schema
const user = require("./model/userSchema")







app.get("/", (req, res) => {
  res.send("hello from home");
});


app.listen(PORT, () => {
  console.log(`listening to ${PORT} `);
});

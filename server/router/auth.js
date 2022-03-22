const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');

const router = express.Router();
const authenticate = require("../middleware/authenticate")
// require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser())


router.get("/", (req, res) => {
  res.send("hello from router home");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password is not matching " });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      //bcrypt

      const userRegister = await user.save();

      if (userRegister) {
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});



//login page

router.post("/signin", async (req, res) => {
  // console.log(req.body)
  // res.json({ message:"done"})
let token;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });

    console.log(userLogin)

    // console.log(userLogin.password)
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
console.log(isMatch)

       token = await  userLogin.generateAuthToken()
      console.log(token)

      res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+25892000000),
        httpOnly:true
      })
      

      if (!isMatch) {
        res.status(400).json({ error: "invalid user details pass " });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid user detailss  " });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/about", authenticate,(req, res) => {
  res.send(req.rootUser)

});

module.exports = router;

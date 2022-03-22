const express = require("express");

const router = express.Router();
const User = require("../model/userSchema");
// require("../db/conn");

router.get("/", (req, res) => {
  res.send("hello from router home");
});

router.post("/register",  (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  console.log(name);
  console.log(email);
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  User.findOne({ email: email }).then((userExists) => {
    if (userExists) {
      return res.status(422).json({ error: "User already exists" });
    }

    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

user.save().then(() => {
  res.status(201).json({message: "User registered successfully"})
}).catch(() => {
  res.status(500).json({ error:"failed to register"})
})

  }).catch((error) => {
    console.log(error)
  })

  // res.json({message:req.body})
  // res.send("my register ")
});

module.exports = router;

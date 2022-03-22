
const mongoose = require("mongoose");
const DB = process.env.DATABASE;


mongoose.connect(
    DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("DB connected succesfully");
      } else {
        console.log("DB not connected");
      }
    }
  );
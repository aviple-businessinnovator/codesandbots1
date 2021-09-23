const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://codesandbot:deepak12345@cluster0.mjssp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });

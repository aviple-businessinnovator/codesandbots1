const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const cookieParser = require("cookie-parser");
require("./db");
const Users = require("../backend/userModel");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const user = await new Users({
      childName: req.body.data.child_name,
      parentName: req.body.data.parent_name,
      mobileNumber: req.body.data.phone_number,
      course: req.body.data.course,
      class: req.body.data.child_class,
    });
    const token = await user.genAuthToken();
    // const otp = await user.genOtpToken();
    await user.save();
    // await user.sendOtpToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(404).send({ msg: "Some Error Occured" });
  }
});
// app.post("/verify", auth, async (req, res) => {
//   console.log(req.body.body);
//   const user = await Users.findById(req.user._id);
//   if (user.otp === req.body.body) {
//     const updateUser = await Users.findByIdAndUpdate(req.user._id, {
//       isAuthenticaed: true,
//     });
//     res.status(200).send({ msg: "Authenticated" });
//   } else if (user.otp !== req.body.body) {
//     res.status(400).send({ msg: "Not Authenticated" });
//   }
// });
// app.get("/resendotp", auth, async (req, res) => {
//   try {
//     const user = await Users.findById(req.user._id);
//     await user.genOtpToken();
//     await user.sendOtpToken();
//     res.status(201).send({ msg: "New Otp Generated" });
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
app.listen("3000", (req, res) => {
  console.log("running");
});

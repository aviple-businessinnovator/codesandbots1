const mongoose = require("mongoose");
var otpGenerator = require("otp-generator");
const accountSid = "AC9d8b631eddf810d8ddd38b765ed66026";
const authToken = "43d17859004d2f6bab94c6e671474a5e";
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },
    class: {
      type: Number,
      required: true,
    },
    // isAuthenticaed: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // otp: {
    //   type: String,
    //   required: false,
    // },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.genAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "newproj");
  user.token = token;
  await user.save();
  return token;
};
// userSchema.methods.genOtpToken = async function () {
//   const user = this;
//   const otpgen = otpGenerator.generate(6, {
//     upperCase: false,
//     specialChars: false,
//   });
//   user.otp = otpgen;
//   await user.save();
//   return otpgen;
// };
// userSchema.methods.sendOtpToken = async function () {
//   const user = this;
//   client.messages
//     .create({
//       body: `Your OTP is => ${user.otp}`,
//       from: "+15207292452",
//       to: `+91${user.mobileNumber}`,
//     })
//     .then((message) => console.log(message.sid))
//     .catch((e) => {
//       console.log(e);
//     });
// };
const Users = mongoose.model("User", userSchema);
module.exports = Users;

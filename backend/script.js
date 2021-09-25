const express = require("express");
const cors = require("cors");
const Course = require("./courseModel");
const path = require("path");
const auth = require("./auth");
const cookieParser = require("cookie-parser");
require("./db");
const Users = require("../backend/userModel");
const app = express();
app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  console.log(req.body);
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
app.get("/course/:courseName", async (req, res) => {
  try {
    console.log(req.params.courseName);
    const course = await Course.findOne({ name: req.params.courseName });
    console.log(course);

    if (!course) {
      return next(
        new ErrorResponse(
          `Course not found with id of ${req.params.courseName}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});
app.post("/create", async (req, res) => {
  try {
    const data = await new Course(req.body);
    console.log(data);
    await data.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(port, (req, res) => {
  console.log("running on " + port);
});

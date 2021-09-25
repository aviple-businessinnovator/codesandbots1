const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  displayName: {
    type: String,
    required: true,
    unique: true,
  },
  introduction: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please add description"],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  photo: {
    type: String,
    required: [true, "Please add photo"],
    unique: true,
    trim: true,
    maxlength: [1000, "link to photo can not be more than 1000 characters"],
  },
  buildDescription: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;

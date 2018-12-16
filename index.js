const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("could not connect to MongoDB..", err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [string],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

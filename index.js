const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("could not connect to MongoDB..", err))

const courseSchema = new mongoose.Schema({
  // once we have a schema, we compile to model down witch gives us a Class (Course)
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model("Course", courseSchema)

async function createCourse() {
  const course = new Course({
    // create object based on class(Course) and store in DB
    name: "Angular Course",
    author: "Luc",
    tags: ["angular", "frontend dev"],
    isPublished: true
  })

  const result = await course.save() // will save to the DB
  console.log(result)
}

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lte (less than or equal to)
  // in
  // nin (not in)
  // or and operators
  const courses = await Course
    // .find({ price: { $gt: 10, $lte: 20 }}) // quering document using operators
    // .find({ price: { $in: [10, 20, 30] }})
    // .find().or([ { author: 'Mosh' }, { isPublished: true }])

    // start with mosh
    // .find({ author: /^Mosh/ })

    // End with Hamadani
    // .find({ author: /Hamadani$/ })

    // Contain mosh
    // .find({ author: /.*Mosh*./i })
    // .count() to count the number of documents

    .find({ author: "Luc", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses)
}

getCourses()

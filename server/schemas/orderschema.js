const mongoose = require("mongoose");

const booklist = mongoose.Schema({
  name: { type: String, required: true, minilength: 3 },
  desc: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  book: { type: String, required: true },
  bookpath: { type: String, required: true },
});

module.exports = mongoose.model("book", booklist);

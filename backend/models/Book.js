const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  imageUrl: { type: String, required: true }, // URL of book cover
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

import { useState,useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const addBook = () => {
    if (title && author && rating && year) {
      const newBook = { title, author, rating, year };

      axios.post("http://localhost:5000/books", newBook, {
        headers: { "Content-Type": "application/json" } // Ensure JSON format
      })
      .then(response => {
        setBooks([...books, response.data]); // Update the UI
        console.log("Book added:", response.data); // Debugging log
      })
      .catch(error => console.error("Error adding book:", error));

      setTitle("");
      setAuthor("");
      setRating("");
      setYear("");
    } else {
      console.error("All fields are required");
    }
  };


  /*const addBook = () => {
    if (title && author && rating && year) {
      setBooks([...books, { title, author, rating, year }]);
      setTitle("");
      setAuthor("");
      setRating("");
      setYear("");
    }
  };   */

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  const updateBook = (index) => {
    const updatedTitle = prompt("Enter new title", books[index].title);
    const updatedAuthor = prompt("Enter new author", books[index].author);
    const updatedRating = prompt("Enter new rating", books[index].rating);
    const updatedYear = prompt("Enter new published year", books[index].year);
    if (updatedTitle && updatedAuthor && updatedRating && updatedYear) {
      const updatedBooks = books.map((book, i) =>
        i === index ? { title: updatedTitle, author: updatedAuthor, rating: updatedRating, year: updatedYear } : book
      );
      setBooks(updatedBooks);
    }
  };

  return (
    <div className="container">
      <header>
        <img src="/logo.png" alt="Bookstore Logo" className="logo" />
        <h1>My Book Store</h1>
      </header>
      <div className="input-box">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} />
        <input type="text" placeholder="Published Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <button onClick={addBook}>Add Book</button>
      </div>
      <div className="books-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-detail"><strong>Title:</strong> {book.title}</div>
            <div className="book-detail"><strong>Author:</strong> {book.author}</div>
            <div className="book-detail"><strong>Rating:</strong> {book.rating}</div>
            <div className="book-detail"><strong>Published Year:</strong> {book.year}</div>
            <div className="button-group">
              <button onClick={() => updateBook(index)}>Edit</button>
              <button onClick={() => deleteBook(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// src/pages/MyBooks.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the Axios instance for making API requests
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch books added by the logged-in user
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books/mycreatedbooks");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle Delete book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId)); // Update UI by removing deleted book
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  // Navigate to edit book page
  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h4 className="text-center text-white mb-4">This is your bookshelf</h4>

      {books.length === 0 ? (
        <p className="text-center text-light">You have not added any books yet.</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={book._id}>
              <div className="card text-white p-2" style={{ backgroundColor: "green" }}>
                {/* Book Image */}
                <img
                  src={
                    book.imageUrl
                      ? `http://localhost:5000${book.imageUrl}`
                      : "/no-image.png"
                  }
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: "175px", objectFit: "cover" }}
                />

                {/* Book Details */}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>By:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Published:</strong> {new Date(book.publicationDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Available Copies:</strong> {book.availableCopies}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {book.available ? "Available" : "Not Available"}
                  </p>
                  
                  {/* Borrowed By */}
                  {book.borrowedBy && book.borrowedBy.length > 0 ? (
                    <div>
                      <h6>Borrowed by:</h6>
                      {book.borrowedBy.map((user) => (
                        <p className="card-text" key={user._id}>
                          {user.name} ({user.email})
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="card-text">Not borrowed yet</p>
                  )}
                </div>

                {/* Edit and Delete Buttons */}
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-warning text-dark w-50 me-2"
                    onClick={() => handleEdit(book._id)}
                  >
                    <FaEdit className="me-1" /> Edit
                  </button>
                  <button
                    className="btn btn-warning text-dark w-50"
                    onClick={() => handleDelete(book._id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;

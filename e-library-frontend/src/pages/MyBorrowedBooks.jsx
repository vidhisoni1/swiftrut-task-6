// src/pages/MyBorrowedBooks.js
import React, { useEffect, useState, useContext } from "react";
import api from "../api/api"; // Import the API instance
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get logged-in user context

const MyBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State to store borrowed books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { user } = useContext(AuthContext); // Access the logged-in user

  // Fetch borrowed books when component loads
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await api.get("/books/myborrowedbooks"); // API call to get borrowed books
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching borrowed books");
        setLoading(false);
      }
    };

    if (user) {
      fetchBorrowedBooks(); // Only fetch if the user is logged in
    }
  }, [user]);

  // Handle the return of a book
  const handleReturn = async (bookId) => {
    try {
      await api.post(`/books/${bookId}/return`); // Call the return book API
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId)); // Remove the returned book from the list
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container py-5">
      <h4 className="text-center text-white mb-4">My Borrowed Books</h4>

      {borrowedBooks.length === 0 ? (
        <p className="text-center text-light">
          You haven't borrowed any books yet.
        </p>
      ) : (
        <div className="row">
          {borrowedBooks.map((book) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={book._id}>
              <div className="card text-white p-2" style={{ backgroundColor: "green" }}>
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
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>By:</strong> {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="card-text">
                    <strong>Published:</strong>{" "}
                    {new Date(book.publicationDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Available Copies:</strong> {book.availableCopies}
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-warning text-dark w-100"
                    onClick={() => handleReturn(book._id)}
                  >
                    Return Book
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

export default MyBorrowedBooks;

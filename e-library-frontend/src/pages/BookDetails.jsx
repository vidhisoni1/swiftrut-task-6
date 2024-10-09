// src/pages/BookDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        setLoading(false);

        if (user && response.data.borrowedBy.includes(user._id)) {
          setIsBorrowed(true);
        }
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, user]);

  const handleBorrow = async () => {
    try {
      await api.post(`/books/${id}/borrow`);
      setIsBorrowed(true);
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies - 1,
      }));
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  const handleReturn = async () => {
    try {
      await api.post(`/books/${id}/return`);
      setIsBorrowed(false);
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies + 1,
      }));
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border text-success" role="status">
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
    <div className="container mt-5">
      <h4 className="text-center text-success mb-4">Book Details</h4>
      <p className="text-center text-secondary">
        Discover the story behind this book
      </p>

      {book && (
        <div className="card p-4 shadow mt-4 col-6 mx-auto">
          <div className="row">
            {/* Book Details - Left Side */}
            <div className="col-md-6">
              <h5 className="text-warning">{book.title}</h5>
              <p>
                <strong>By:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Published:</strong>{" "}
                {new Date(book.publicationDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Available Copies:</strong> {book.availableCopies}
              </p>
              <p className="mt-2">{book.description}</p>

              {user && (
                <div className="mt-4">
                  {isBorrowed ? (
                    <button
                      className="btn btn-warning w-100"
                      onClick={handleReturn}
                    >
                      Return Book
                    </button>
                  ) : book.availableCopies > 0 ? (
                    <button
                      className="btn btn-success w-100"
                      onClick={handleBorrow}
                    >
                      Borrow Book
                    </button>
                  ) : (
                    <p className="text-danger">No copies available for borrowing</p>
                  )}
                </div>
              )}
            </div>

            {/* Book Image - Right Side */}
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={
                  book.imageUrl
                    ? `http://localhost:5000${book.imageUrl}`
                    : "/no-image.png"
                }
                alt={book.title}
                className="img-fluid rounded border border-warning"
                style={{ maxWidth: "400px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;

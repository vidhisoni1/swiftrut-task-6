// src/components/BookCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Redirect to book details on click
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      className="card text-white p-2"
      style={{
        backgroundColor: "green",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onClick={handleClick}
    >
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
          <strong>Published:</strong>{" "}
          {new Date(book.publicationDate).toLocaleDateString()}
        </p>
        <p className="card-text">
          <strong>Available Copies:</strong> {book.availableCopies}
        </p>

        <button
          className="btn btn-warning text-dark w-100 mt-3"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering card click event
            handleClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;

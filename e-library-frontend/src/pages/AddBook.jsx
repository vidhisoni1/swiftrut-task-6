// src/pages/AddBook.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Import your Axios instance for API requests

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("publicationDate", formData.publicationDate);
    data.append("availableCopies", formData.availableCopies);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Book added successfully!");
      navigate("/my-books");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow col-6 mx-auto bg-success">
        <h4 className="text-center mb-4 text-light">ADD BOOKS </h4>
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="title" className="text-light">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="author" className="text-light">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="genre" className="text-light">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="publicationDate" className="text-light">Publication Date</label>
            <input
              type="date"
              className="form-control"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="availableCopies" className="text-light">Available Copies</label>
            <input
              type="number"
              className="form-control"
              id="availableCopies"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image" className="text-light">Book Cover Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 text-light">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

// src/pages/EditBook.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API requests

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
  });
  const [image, setImage] = useState(null); // State for storing the new image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the current book details using the book ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate.split("T")[0], // Format for date input
          availableCopies: book.availableCopies,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for the image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("author", formData.author);
    updatedData.append("genre", formData.genre);
    updatedData.append("publicationDate", formData.publicationDate);
    updatedData.append("availableCopies", formData.availableCopies);

    if (image) {
      updatedData.append("image", image); // Append the image only if it's updated
    }

    try {
      await api.put(`/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // For handling file uploads
        },
      });
      navigate("/my-books"); // Redirect to "My Books" page after successful update
    } catch (error) {
      console.error("Error updating the book:", error);
      setError("Failed to update the book. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow col-6 mx-auto" style={{ backgroundColor: "green" }}>
        <h4 className="text-center text-white mb-4">EDIT BOOKS </h4>
        {error && (
          <div className="alert alert-danger text-center mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="publicationDate">Publication Date</label>
            <input
              type="date"
              className="form-control"
              id="publicationDate"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-white" htmlFor="availableCopies">Available Copies</label>
            <input
              type="number"
              className="form-control"
              id="availableCopies"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="text-white" htmlFor="image">Upload New Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 text-light">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;

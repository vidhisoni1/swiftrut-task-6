// src/pages/Home.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    publicationYear: "",
  });

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setFilteredBooks(response.data); // Initialize filtered books
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = books;

    if (filters.genre) {
      filtered = filtered.filter((book) => book.genre === filters.genre);
    }

    if (filters.author) {
      filtered = filtered.filter((book) => book.author === filters.author);
    }

    if (filters.publicationYear) {
      filtered = filtered.filter(
        (book) =>
          new Date(book.publicationDate).getFullYear().toString() ===
          filters.publicationYear
      );
    }

    setFilteredBooks(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ genre: "", author: "", publicationYear: "" });
    setFilteredBooks(books);
  };

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];
  const uniqueYears = [
    ...new Set(
      books.map((book) => new Date(book.publicationDate).getFullYear().toString())
    ),
  ];

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
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  return (
    <div className="container py-5">
      <h4 className="text-center text-white mb-4">Explore Our Popular Books</h4>

      {/* Filter Controls */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <select
            name="genre"
            className="form-select"
            value={filters.genre}
            onChange={handleFilterChange}
          >
            <option value="">BOOKS</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <select
            name="author"
            className="form-select"
            value={filters.author}
            onChange={handleFilterChange}
          >
            <option value="">AUTHORS</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <select
            name="publicationYear"
            className="form-select"
            value={filters.publicationYear}
            onChange={handleFilterChange}
          >
            <option value="">YEARS</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-sm-6 col-md-3 mb-3 d-flex justify-content-center">
          <button className="btn btn-warning w-100" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3 d-flex justify-content-center">
          <button className="btn btn-outline-light w-100" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      {/* Display Books */}
      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={book._id}>
            <div className="card text-white" style={{ backgroundColor: "green" }}>
              <BookCard book={book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

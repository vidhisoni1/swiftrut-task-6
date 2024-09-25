import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/api'; // Import the Axios function

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: '', author: '', date: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Available Books</h1>
        <div className="flex gap-4 mt-2">
          <input
            type="text"
            name="author"
            placeholder="Filter by author"
            value={filters.author}
            onChange={handleFilterChange}
            className="border p-2"
          />
          <input
            type="text"
            name="genre"
            placeholder="Filter by genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="border p-2"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>{book.publicationDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;

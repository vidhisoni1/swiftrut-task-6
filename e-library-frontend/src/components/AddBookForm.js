import React, { useState } from 'react';
import { addBook } from '../api/api'; // Import the Axios function

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// In AddBookForm.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addBook(formData, token); // Pass token
      console.log('Book added:', data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  

  return (
    <form className="container mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Publication Date</label>
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;

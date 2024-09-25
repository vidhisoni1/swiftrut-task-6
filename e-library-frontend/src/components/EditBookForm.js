import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, updateBook } from '../api/api'; // Import Axios functions

const EditBookForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookById(id);
        setFormData({
          title: data.title,
          author: data.author,
          genre: data.genre,
          publicationDate: data.publicationDate,
        });
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateBook(id, formData);
      console.log('Book updated:', data);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form className="container mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Edit Book Details</h1>
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
        Update Book
      </button>
    </form>
  );
};

export default EditBookForm;

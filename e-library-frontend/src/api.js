// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5500/api'; // Replace with your backend API URL

// Fetch all books
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData, token) => {
    try {
      const response = await axios.post(`${API_URL}/books`, bookData, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  };

// Update an existing book by ID
export const updateBook = async (id, bookData, token) => {
    try {
      const response = await axios.put(`${API_URL}/books/${id}`, bookData, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };
  


// Delete a book by ID
export const deleteBook = async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };
  
  export const borrowBook = async (bookId, token) => {
    try {
      const response = await axios.post(`${API_URL}/books/borrow/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error borrowing book:', error);
      throw error;
    }
  };

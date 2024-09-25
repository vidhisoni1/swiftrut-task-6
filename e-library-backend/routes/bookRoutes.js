// routes/bookRoutes.js
const express = require('express');
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Public route to fetch all books
router.get('/', getBooks);

// Protected routes for book CRUD (Admin only) and borrow/return (User only)
router.post('/', protect, addBook); // Add new book (Admin)
router.put('/:id', protect, updateBook); // Update book (Admin)
router.delete('/:id', protect, deleteBook); // Delete book (Admin)
router.post('/borrow/:id', protect, borrowBook); // Borrow book (User)
router.post('/return/:id', protect, returnBook); // Return book (User)

module.exports = router;

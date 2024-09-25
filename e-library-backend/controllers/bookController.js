// controllers/bookController.js
const Book = require('../models/Book');

// Fetch all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new book (Admin only)
exports.addBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;

  try {
    const book = await Book.create({ title, author, genre, publicationDate });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing book (Admin only)
exports.updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book (Admin only)
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Borrow a book (User only)
exports.borrowBook = async (req, res) => {
    const { id } = req.params;
  
    try {
      const book = await Book.findById(id);
  
      // Check if the book is available
      if (!book.isAvailable) {
        return res.status(400).json({ message: 'Book is currently unavailable' });
      }
  
      // Mark the book as borrowed and assign the user
      book.isAvailable = false;
      book.borrowedBy = req.user._id; // The logged-in user
  
      await book.save();
  
      res.status(200).json({
        message: 'Book borrowed successfully',
        book,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  // controllers/bookController.js

// Return a book (User only)
exports.returnBook = async (req, res) => {
    const { id } = req.params;
  
    try {
      const book = await Book.findById(id);
  
      // Check if the book is currently borrowed by the logged-in user
      if (book.borrowedBy.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'You are not the borrower of this book' });
      }
  
      // Mark the book as available and clear the borrower
      book.isAvailable = true;
      book.borrowedBy = null;
  
      await book.save();
  
      res.status(200).json({
        message: 'Book returned successfully',
        book,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
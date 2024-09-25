import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './components/EditBookForm';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [token, setToken] = useState(null); // JWT token stored in state

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

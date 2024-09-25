import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById  , borrowBook} from '../api/api'; // Import the Axios function


const handleBorrow = async () => {
  try {
    const data = await borrowBook(book.id, token); // Use JWT token
    console.log('Book borrowed:', data);
  } catch (error) {
    console.error('Error borrowing book:', error);
  }
};




const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Publication Date: {book.publicationDate}</p>
      <button onClick={handleBorrow} className="bg-green-500 text-white p-2 rounded mt-4">
    {book.isAvailable ? 'Borrow' : 'Return'}
  </button>
     
    </div>
  );
};

export default BookDetail;

import React from 'react';
import BookShelfChanger from './bookShelfChanger';

const Book = ({ book, updateBook }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
          <BookShelfChanger 
            updateBook={updateBook}
            book={book} />
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.authors ? book.authors[0] : '' }</div>
      </div>
    </li>
  );
}
 
export default Book;
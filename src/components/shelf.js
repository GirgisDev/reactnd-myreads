import React from 'react';
import Book from "./book";

const Shlef = ({shelf, existingShelfes, updateBook}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ shelf.title }</h2>
      <div className="bookshelf-books">
        {(shelf.books ? shelf.books.length : false) ? (
          <ol className="books-grid">
            {shelf.books.map(book => (
              <Book 
                key={book.id} 
                book={book}
                updateBook={updateBook} />
            ))}
          </ol>) : (
          <div className="no-content-message">You have no books in this shelf!</div>
        )}
      </div>
    </div>
  );
}
 
export default Shlef;
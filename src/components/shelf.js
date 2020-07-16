import React from 'react';
import Book from "./book";

const Shlef = ({shelf, existingShelfes, updateBook}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ shelf.title }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelf.books.map(book => (
            <Book 
              key={book.id} 
              book={book}
              updateBook={updateBook}
              existingShelfes={existingShelfes} />
          ))}
        </ol>
      </div>
    </div>
  );
}
 
export default Shlef;
import React from 'react';

const BookShelfChanger = ({ book, updateBook }) => {
  let updatedBookShelf = shelf => {
    updateBook({ book, shelf });
  }
  return (
    <div className="book-shelf-changer">
      <select defaultValue={book.shelf || 'none'} onChange={e => updatedBookShelf(e.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently reading</option>
        <option value="wantToRead">Want to read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}
 
export default BookShelfChanger;
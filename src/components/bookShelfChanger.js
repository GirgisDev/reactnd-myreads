import React from 'react';

const BookShelfChanger = ({ book, updateBook }) => {
  let updatedBookShelf = shelf => {
    updateBook({ book, shelf });
  }
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'move'} onChange={e => updatedBookShelf(e.target.value)}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">currentlyReading</option>
        <option value="wantToRead">wantToRead</option>
        <option value="read">read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}
 
export default BookShelfChanger;
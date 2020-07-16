import React from 'react';
import Utils from "./../utils.js/utils";

const BookShelfChanger = ({ existingShelfes, book, updateBook }) => {
  let updatedBookShelf = shelf => {
    updateBook({ book, shelf });
  }
  return (
    <div className="book-shelf-changer">
      <select defaultValue="move" onChange={e => updatedBookShelf(e.target.value)}>
        <option value="move" disabled>Move to...</option>
        {existingShelfes.map(shelf => (
          <option key={shelf} value={shelf}>{ Utils.camelCaseToSentence(shelf) }</option>
        ))}
        <option value="none">None</option>
      </select>
    </div>
  );
}
 
export default BookShelfChanger;
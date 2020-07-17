import React from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ backPath, searchFN }) => {
  return (
    <div className="search-books-bar">
      <Link to={backPath} className="close-search" />
      <div className="search-books-input-wrapper">
        <input 
          type="text" 
          placeholder="Search by title or author"
          onInput={e => searchFN(e.target.value)} />
      </div>
    </div>
  );
}
 
export default SearchBar;
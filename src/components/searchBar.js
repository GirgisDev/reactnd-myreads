import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Link } from 'react-router-dom';

const SearchBar = ({ backPath, searchFN }) => {
  let inputStream = new BehaviorSubject();
  inputStream
    .pipe(debounceTime(500))
    .subscribe(query => {
      if (query !== undefined) searchFN(query);
    })
  return (
    <div className="search-books-bar">
      <Link to={backPath} className="close-search" />
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          onInput={e => inputStream.next(e.target.value)} />
      </div>
    </div>
  );
}

export default SearchBar;
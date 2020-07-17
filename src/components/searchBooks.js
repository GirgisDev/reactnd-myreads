import React, { Component } from 'react'
import * as BooksAPI from './../BooksAPI';
import SearchBar from './searchBar';
import Book from './book';
import LoadingIcon from "./../icons/loading.svg";

class SearchBooks extends Component {
  state = {
    books: [],
    myBooks: [],
    loading: false,
    query: ""
  }

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks });
    })
  }

  searchBooks = query => {
    if (!query) {
      this.resetState();
      return;
    }
    this.setState({ query, loading: true })
    BooksAPI.search(query).then(res => {
      this.updateBooksShelfes(res.error ? [] : res);
    })
  }

  resetState = () => {
    this.setState({ books: [], query: "" })
  }

  updateBooksShelfes = books => {
    if (!books.length) {
      this.setState({ books: [], loading: false });
      return;
    }
    books.forEach(book => {
      let oneOfMyBooks = this.state.myBooks.find(myBook => myBook.id === book.id);;
      if (oneOfMyBooks) book.shelf = oneOfMyBooks.shelf;
    });
    this.setState({ books, loading: false });
  }

  updateBook = ({ book, shelf }) => {
    this.setState({ loading: true });
    BooksAPI.update({ book, shelf }).then(updatedShelfes => {
      this.setState(prevState => {
        return this.updateShelfOfThatBook({ book, shelf, prevState });
      })
    })
  }

  updateShelfOfThatBook = ({ book, shelf, prevState }) => {
    let books = [...prevState.books],
      bookIndex = books.indexOf(book);
    books[bookIndex].shelf = shelf;
    return { loading: false, books };
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar backPath={'/'} searchFN={this.searchBooks} />
        <div className="search-books-results">
          {this.state.loading ? (
            <img src={LoadingIcon} className="loading-icon" alt="Loading icon" />
          ) : (
            (this.state.query && this.state.books.length) 
            ? (
              <ol className="books-grid">
                {this.state.books.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    updateBook={this.updateBook} />
                ))}
              </ol>
            ) : (
              <div className="no-content-message no-content-message--with-margin">
                No books match your search query, try searaching with different keyword
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
import React, { Component } from 'react';
import * as BooksAPI from './../BooksAPI';
import Utils from "./../utils.js/utils";
import { Link } from "react-router-dom";
import Shelf from "./shelf";
import LoadingIcon from "./../icons/loading.svg";

class MyReads extends Component {
  state = {
    shelfes: [],
    existingShelfes: [],
    existingBooks: [],
    loading: true
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setBooksToShelfes(books);
    })
  }

  setBooksToShelfes = books => {
    let shelfes = [];
    let existingShelfes = [...this.state.existingShelfes];
    books.forEach(book => {
      if (existingShelfes.includes(book.shelf)) {
        let shelfIndex = existingShelfes.indexOf(book.shelf);
        shelfes[shelfIndex].books = [...shelfes[shelfIndex].books, book];
      } else {
        existingShelfes.push(book.shelf);
        shelfes.push({
          name: book.shelf,
          title: Utils.camelCaseToSentence(book.shelf),
          books: [book]
        })
      }
    });
    this.setState({ 
      shelfes, existingShelfes, 
      existingBooks: books, loading: false  
    });
  }

  updateBook = ({ book, shelf }) => {
    this.setState({ loading: true });
    BooksAPI.update({ book, shelf }).then(updatedShelfes => {
      this.setState(prevState => {
        this.updateShelfOfThatBook({book, shelf, prevState});
      }, () => {
        this.updateBookShelfes(updatedShelfes);
      })
    })
  }

  updateShelfOfThatBook = ({book, shelf, prevState}) => {
    let existingBooks = [...prevState.existingBooks],
      bookIndex = existingBooks.indexOf(book);
    existingBooks[bookIndex].shelf = shelf;
    return { existingBooks };
  }

  updateBookShelfes = updatedShelfes => {
    let shelfes = [],
      existingBooks = this.state.existingBooks;
    Object.keys(updatedShelfes).forEach(shelfName => {
      shelfes.push({
        name: shelfName,
        title: Utils.camelCaseToSentence(shelfName),
        books: existingBooks.filter(({ id }) => ~updatedShelfes[shelfName].indexOf(id))
      })
    })
    this.setState({ shelfes, loading: false })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {!this.state.loading ? (
          <div>
            <div className="list-books-content">
              {this.state.shelfes.map(shelf => (
                <Shelf
                  key={shelf.name}
                  shelf={shelf}
                  updateBook={this.updateBook} />
              ))}
            </div>
            <Link to="/search" className="open-search-link">Add a book</Link>
          </div>
        ) : (
            <img src={LoadingIcon} className="loading-icon" alt="Loading icon" />
          )}
      </div>
    );
  }
}

export default MyReads;
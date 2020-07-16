import React, { Component } from 'react';
import * as BooksAPI from './../BooksAPI';
import Utils from "./../utils.js/utils";
import { Link } from "react-router-dom";
import Shelf from "./shelf";

class MyReads extends Component {
  state = {
    shelfes: [],
    existingShelfes: [],
    existingBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ existingBooks: books })
      this.setBooksToShelfes(books);
    })
  }

  setBooksToShelfes = books => {
    let shelfes = [];
    let existingShelfes = [];
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
    this.setState({ shelfes, existingShelfes });
  }

  updateBook = ({ book, shelf }) => {
    BooksAPI.update({ book, shelf }).then(updatedShelfes => {
      this.updateBookShelfes(updatedShelfes);
    })
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
    this.setState({ shelfes })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.shelfes.map(shelf => (
            <Shelf
              key={shelf.name}
              shelf={shelf}
              existingShelfes={this.state.existingShelfes}
              updateBook={this.updateBook} />
          ))}
        </div>
        <Link to="/search" className="open-search-link">Add a book</Link>
      </div>
    );
  }
}

export default MyReads;
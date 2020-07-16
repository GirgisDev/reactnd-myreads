import React from 'react'
import './App.css'
import { Switch, Route } from "react-router-dom";
import MyReads from "./components/myReads";
import SearchBooks from './components/searchBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={SearchBooks} />
        <Route path="/" component={MyReads} />
      </Switch>
    )
  }
}

export default BooksApp

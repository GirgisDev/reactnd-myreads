import React from 'react';
import './App.css'
import { Switch, Route, Redirect } from "react-router-dom";
import MyReads from "./components/myReads";
import SearchBooks from './components/searchBooks';
import NotFound from './components/notFound';

const BooksApp = () => {
  return (
    <Switch>
      <Route path="/search" component={SearchBooks} />
      <Route path="/" exact component={MyReads} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default BooksApp

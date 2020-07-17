import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="no-content-message">
      <h1>The page you requested is not found!</h1>
      <Link to="/">Go to My reads page</Link>
    </div>
  );
}

export default NotFound;
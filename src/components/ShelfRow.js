import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ShelfRow extends Component {
  render() {
    const {title, books, onShelfUpdate} = this.props
    return (
      <div className="bookshelf">
        <h1 className="bookshelf-title">{title}</h1>
      	<hr />
        <div className="bookshelf-books">
      	  <ul className="books-grid">
            {books.length > 0 ? (books.map((book, index) => (
              <Book
                key={index}
                book={book}
                onShelfUpdate={onShelfUpdate}
      		  />
            )))
  			: (<p>No Books in this shelf</p>)
            }
  		  </ul>
        </div>
      </div>
    )
  }
}

ShelfRow.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  onShelfUpdate: PropTypes.func
}

export default ShelfRow
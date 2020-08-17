import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  render() {
    const {book, onShelfUpdate} = this.props
    const noCoverImage = '../img/no_cover_thumb.gif'

    return (
      <li className="book">
      	<div className="book-top">
      	  <div
      		className="book-cover"
      		style={{ width: 128,
      				 height: 193,
      				 backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noCoverImage})`
		    }}>
		  </div>
          <div className="book-shelf-changer">
      		<select value={book.shelf} onChange={e => onShelfUpdate(book, e.target.value)}>
      		  <option value="moveTo" disabled>Move to...</option>
		      <option value="currentlyReading">Currently Reading</option>
      		  <option value="wantToRead">Want to Read</option>
		      <option value="read">Read</option>
		      <option value="none">None</option>
	        </select>
          </div>
		  <div className="book-title">{book.title ? book.title : ''}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfUpdate: PropTypes.func
}

export default Book
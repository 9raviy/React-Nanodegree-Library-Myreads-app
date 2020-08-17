import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import {DebounceInput} from 'react-debounce-input'

class Search extends Component {
  state = {
    books: [],
    booksOnDisplay: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
    	booksOnDisplay: allBooks.filter(book => book.shelf !== 'none')
	  })
  	})
  }

  updateQuery(query) {
    this.setState({ query })
  }

  onShelfUpdate = (book, shelfName) => {
    BooksAPI.update(book, shelfName)
    const { books } = this.state
	const updateIndex = books.findIndex(b => b.id === book.id)
    const updateBook = books[updateIndex]
    updateBook.shelf = shelfName

    this.setState({
      books: [...books.slice(0, updateIndex), updateBook, ...books.slice(updateIndex + 1)]
    })
  }

  searchBooks(query) {
    const { booksOnDisplay } = this.state
	this.updateQuery(query)
    if (query) {
      BooksAPI.search(query, 20).then((results) => {
        if (results && results.length > 0) {
          let searchResults = results
      	  searchResults.map((book) => book.shelf = 'none' )
      	  booksOnDisplay.map((book) => {
      		const updateIndex = searchResults.findIndex(s => s.id === book.id)
      		if (searchResults[updateIndex]) {
      		  searchResults[updateIndex].shelf = book.shelf
    		}
    	  })
          this.setState({ books: searchResults })
        } else {
          this.setState({ books: [] })
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render() {
	const { books, query } = this.state

	return (
      <div className="search-books">
      	<div className="search-books-bar">
      	  <Link to="/" className="close-search" />
      	  <div className="search-books-input-wrapper">
			<DebounceInput
			  minLength={2}
          	  debounceTimeout={300}
			  onChange={(e) => this.searchBooks(e.target.value)}
			/>
      	  </div>
      	</div>
		<div className="search-books-results">
          <ul className="books-grid">
            {books.length > 0 ? (books.map((book, index) => (
              <Book
                key={index}
                book={book}
                onShelfUpdate={this.onShelfUpdate}
      		  />
            )))
  			: ( query.length === 0 ? (<p>No query entered</p>) : (<p>No Results Found</p>) )
            }
  		  </ul>
        </div>
      </div>
    )
  }
}

export default Search
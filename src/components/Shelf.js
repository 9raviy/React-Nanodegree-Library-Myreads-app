import React, { Component } from 'react'
import ShelfRow from './ShelfRow'
import * as BooksAPI from '../BooksAPI'

class Shelf extends Component {
  state = {
  	allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ allBooks: books })
	  })
  }

  onShelfUpdate = (book, shelfName) => {
    const { allBooks } = this.state
	const updateIndex = allBooks.findIndex(b => b.id === book.id)
    const updateBook = allBooks[updateIndex]
    updateBook.shelf = shelfName

    this.setState({
      allBooks: [...allBooks.slice(0, updateIndex), updateBook, ...allBooks.slice(updateIndex + 1)]
    })

    BooksAPI.update(book, shelfName)
  }

  render() {
    const { allBooks } = this.state

    const shelfRows = [
      {
    	name: 'Read',
    	books: allBooks.filter(book => book.shelf === 'read')
      },
      {
    	name: 'Current Reading',
    	books: allBooks.filter(book => book.shelf === 'currentlyReading')
      },
      {
    	name: 'Want To Read',
    	books: allBooks.filter(book => book.shelf === 'wantToRead')
      }
    ]

	return (
      <div className="list-books-content">
        <ul>
          {shelfRows && shelfRows.map((shelf, index) => (
            <ShelfRow
              key={index}
              title={shelf.name}
              books={shelf.books}
              onShelfUpdate={this.onShelfUpdate}/>
          ))}
		</ul>
	  </div>
    )
  }
}

export default Shelf
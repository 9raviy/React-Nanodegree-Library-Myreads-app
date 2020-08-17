import React from 'react'
import Title from './Title'
import Shelf from './Shelf'
import AddBook from './AddBook'

const Main = (props) => {
  return (
    <div className="main-page">
      <Title />
      <Shelf />
      <AddBook />
    </div>
  )
}

export default Main
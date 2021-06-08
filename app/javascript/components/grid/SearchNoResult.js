import React from 'react'

const SearchNoResult = ({ searchValue }) =>{
  return(
    <div
      className="no-deleted-pen mt-8"
      style={{
        marginRight: '0'
      }}
    >
      <h2>No results for { searchValue }</h2>
      <blockquote
      style={{
        maxWidth: '25em',
        margin: '2rem auto'
      }}>
        <p>If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing.</p>
        <br />
        <cite>— Southern Oracle, The Neverending Story</cite>
      </blockquote>
    </div>
  )
};
export default SearchNoResult
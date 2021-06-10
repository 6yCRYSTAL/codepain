import React from 'react'

const SearchNoResult = ({ searchValue }) =>{
  return(
    <div className="no-deleted-pen no-search-pen">
      <h2>No results for <em>{ searchValue }.</em></h2>
      <blockquote>
        <p>If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing.</p>
        <br />
        <cite>— Southern Oracle, The Neverending Story</cite>
      </blockquote>
    </div>
  )
};
export default SearchNoResult
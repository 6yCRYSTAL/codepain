import React, { useState } from 'react'

// 搜尋功能
function SearchInput({ setSearchValue,setSearchNoData }) {
  const [value,setValue] = useState([]);
  const [toggle,setToggle] = useState(false);
  function getValue(e) {
    setValue(e.currentTarget.value);
  }
  function saveValue(e) {
    e.preventDefault();
    setSearchValue(value);
    setToggle(true);
  }
  function clearSearch() {
    setValue('');
    setSearchValue('');
    setToggle(false);
    setSearchNoData(false);
  }
  return(
    <>
      <form className="your-work-search" onSubmit={ saveValue }>
        <label htmlFor="search_term">SEARCH</label>
        <input
          type="text"
          name="search_term"
          id="search_term"
          placeholder="Search for..."
          className="search-text"
          value={value}
          onChange={getValue}
        />
        <button className="search-btn">Search</button>
      </form>
      <button
        className="clear-search"
        onClick={ clearSearch }
        style={{
          display: toggle && 'inline-block',
        }}
      >Clear Search</button>
    </>
  )
}
export default SearchInput
import React from 'react'

// 下拉排序功能
function SortBy({ setSortBy,isSortBy }) {
  const handleSortBy =(e)=>{
    setSortBy(e.target.value);
  }
  return(
    <>
      <label className="sort-by" htmlFor="sort_by">SORT BY</label>
      <form className="sort-by-select">
        <select
          name="sort_by"
          id="sort_by"
          value={ isSortBy }
          onChange={ handleSortBy }
        >
          <option value="Date Created">Date Created</option>
          <option value="Date Updated">Date Updated</option>
          <option value="Popularity">Popularity</option>
        </select>
        <div className="sort-by-select-icon"><i className="fas fa-chevron-down" /></div>
      </form>
    </>
  )
}
export default SortBy
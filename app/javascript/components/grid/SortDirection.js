import React from 'react'

// 排序功能
function SortDirection({ setSortOrder }) {
  const DescClick = (e)=>{
    e.preventDefault();
    setSortOrder('');
    e.currentTarget.classList.add('order-active');
    e.currentTarget.nextElementSibling.classList.remove('order-active');
  }
  const AscClick = (e)=>{
    e.preventDefault();
    setSortOrder('asc');
    e.currentTarget.classList.add('order-active')
    e.currentTarget.previousElementSibling.classList.remove('order-active')
  }
  return(
    <>
      <div className="sort-by-order-wrap">
        <span>Sort Direction</span>
        <a
          className="sortOrderDESC order-active"
          onClick= { DescClick }
        >
          <div className="sort-by-order"><i className="fas fa-chevron-down" /></div>
        </a>
        <a
          className="sortOrderASC"
          onClick= { AscClick }
        >
          <div className="sort-by-order asc-icon"><i className="fas fa-chevron-down" /></div>
        </a>
      </div>
    </>
  )
}
export default SortDirection
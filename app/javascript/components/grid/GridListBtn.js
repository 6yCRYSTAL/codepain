import React from 'react'
import GridListStyle from '../../frontend/gridList_btn.js'

// 切換鈕 component
function GridListBtn() {
  React.useEffect(()=>{
    GridListStyle()
  })
  return(
    <div className="grid-list-btn">
      <a className="grid-btn" href="/your-work?grid_type=grid">
        <span>grid</span>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-60.741 20.407 74.148 45.778" width="19">
            <path
            d="M-47.704 20.407h-8.666a4.332 4.332 0 00-4.37 4.37v8.742c0 2.37 1.925 4.37 4.37 4.37h8.74c2.37 0 4.37-1.926 4.37-4.37v-8.741c-.073-2.445-2-4.37-4.444-4.37zM-47.704 48.704h-8.666c-2.37 0-4.37 1.926-4.37 4.37v8.74c0 2.371 1.925 4.371 4.37 4.371h8.74c2.37 0 4.37-1.926 4.37-4.37v-8.74c-.073-2.371-2-4.371-4.444-4.371zM-19.333 20.407h-8.741c-2.37 0-4.37 1.926-4.37 4.37v8.742c0 2.37 1.925 4.37 4.37 4.37h8.74c2.371 0 4.371-1.926 4.371-4.37v-8.741c0-2.445-2-4.37-4.37-4.37zM-19.333 48.704h-8.741c-2.37 0-4.37 1.926-4.37 4.37v8.74c0 2.371 1.925 4.371 4.37 4.371h8.74c2.371 0 4.371-1.926 4.371-4.37v-8.74c0-2.371-2-4.371-4.37-4.371zM8.963 20.407H.296c-2.37 0-4.37 1.926-4.37 4.37v8.742c0 2.37 1.926 4.37 4.37 4.37h8.741c2.37 0 4.37-1.926 4.37-4.37v-8.741c-.074-2.445-2-4.37-4.444-4.37zM8.963 48.704H.296c-2.37 0-4.37 1.926-4.37 4.37v8.74c0 2.371 1.926 4.371 4.37 4.371h8.741c2.37 0 4.37-1.926 4.37-4.37v-8.74c-.074-2.371-2-4.371-4.444-4.371z">
            </path>
          </svg>
        </button>
      </a>
      <a className="list-btn" href="/your-work?grid_type=list">
        <button>
          <svg viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg" width="16.5">
            <path clipRule="evenodd"
            d="M.5 1a1 1 0 011-1H16a1 1 0 110 2H1.5a1 1 0 01-1-1zM.5 6.5a1 1 0 011-1H16a1 1 0 110 2H1.5a1 1 0 01-1-1zM.5 12a1 1 0 011-1H16a1 1 0 110 2H1.5a1 1 0 01-1-1z">
            </path>
          </svg>
        </button>
        <span>list</span>
      </a>
    </div>
  )
}
export default GridListBtn
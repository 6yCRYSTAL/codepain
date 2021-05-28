import React from 'react'
import ConsoleButton from './ConsoleBtn'
import DeleteButton from './DeleteBtn'
import ShareButton from './ShareBtn'

const MainFooter = () => {
  return (
    <div className="edit-footer-btn">
      <div className="footer-left">
        <ConsoleButton />
        <button id="clear-console-btn" className="btn-assets">Assets</button>
        <button className="btn-Comments">Comments</button>
      </div>
      <div className="footer-right">
        <div className="save-dateTime">
          <time>...</time>
        </div>
        <DeleteButton />
        <button className="btn-collection">Add to Collection</button>
        <ShareButton />
      </div>
    </div>
  )
}

export default MainFooter
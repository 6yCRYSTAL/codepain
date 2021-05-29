import React from 'react'
import ShareUrlBox from './ShareUrlBox'

const MainFooter = () => {
  const [show, setShow] = React.useState(false)

  const showShareBox = () => {
    setShow(!show)
  }
  return (
    <div className="edit-footer-btn">
      <div className="footer-left">
        <button id="console-btn" className="btn-console"> Console </button>
        <button id="clear-assets-btn" className="btn-assets"> Assets </button>
        <button className="btn-Comments"> Comments </button>
      </div>
      <div className="footer-right">
        <div className="save-dateTime">
          <time>...</time>
        </div>
        <button id="btn-delet" className="btn-delete"> Delete </button>
        <button className="btn-collection"> Add to Collection </button>
        <button id="edit-share-btn" className="btn-Share" onClick={showShareBox}> Share </button>
        { show &&  <ShareUrlBox/> }
      </div>
    </div>
  )
}

export default MainFooter
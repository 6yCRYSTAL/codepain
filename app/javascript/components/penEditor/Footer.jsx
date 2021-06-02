import React, {useState} from 'react'
import ShareUrlBox from './ShareUrlBox'

const MainFooter = () => {

  const [showURL, setShowURL] = useState(false)
  const updatBtn = document.querySelector('#btn-update')

  function showShareBox() {
    setShowURL(!showURL)
  }

  return (
    <div className="edit-footer-btn">
      <div className="footer-left">
        <button> Console </button>
        <button id="clear-assets-btn" className="btn-assets"> Assets </button>
        <button className="btn-Comments"> Comments </button>
      </div>
      <div className="footer-right" data-controller="delete-pen">
        <div className="save-dateTime">
          <time>...</time>
        </div>
        { updatBtn && (<button id="btn-delet" className="btn-delete" data-delete-pen-target="deleteBtn" data-action="click->delete-pen#popup"> Delete </button>) }
        <button className="btn-collection"> Add to Collection </button>
        <button id="edit-share-btn" className="btn-Share" onClick={showShareBox}> Share </button>
        { showURL && <ShareUrlBox/> }
      </div>
    </div>
  )
}

export default MainFooter
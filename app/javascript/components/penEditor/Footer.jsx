import React, {useState} from 'react'
import ShareUrlBox from './ShareUrlBox'

const MainFooter = () => {

  const [showURL, setShowURL] = useState(false)
  const updatBtn = document.querySelector('#btn-update')

  function showShareBox() {
    let sheareBtn = document.querySelector('.btn-Share')
    window.addEventListener('click', (e) => {
      if(e.target.contains(sheareBtn)){
        setShowURL(!showURL)
      } else {
        setShowURL(false)
      }
    })
  }

  return (
    <div className="edit-footer-btn">
      <div className="footer-left"></div>
      <div className="footer-right" data-controller="delete-pen">
        <div className="save-dateTime"></div>
        { updatBtn && (<button id="btn-delet" className="btn-delete" data-action="click->delete-pen#popup"> Delete </button>) }
        <button id="edit-share-btn" className="btn-Share" onClick={showShareBox}> Share </button>
        { showURL && <ShareUrlBox/> }
      </div>
    </div>
  )
}

export default MainFooter
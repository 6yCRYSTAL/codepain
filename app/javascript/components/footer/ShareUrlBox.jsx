import React from 'react';

const ShareUrlBox = () => {
  const copyLink = {
    // document.execCommand('copy')
  }


  return (
    <div className="share-box">Share The URL
      <input
        className="share-btn-input"
        defaultValue={window.location.href}>
      </input>
      <div className = "share-btn-copy" onClick={() =>  navigator.clipboard.writeText(`${window.location.href}`)}>Copy Link</div>
    </div>
  )
}

export default ShareUrlBox
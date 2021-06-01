import React from 'react';

const ShareBox = () => {

  const copyLink = () => {
    navigator.clipboard.writeText(`${location.href}`)
  }

  return (
    <div className="share-box">Share The URL
      <input
        className="share-btn-input"
        defaultValue={location.href}>
      </input>
      <div className = "share-btn-copy" onClick={copyLink}>Copy Link</div>
    </div>
  )
}

export default ShareBox
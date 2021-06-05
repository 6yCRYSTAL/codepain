import React, { useRef } from 'react';

const ShareBox = () => {

  const refInput = useRef()

  function copyLink() {
    const url = refInput.current
    url.select()
    navigator.clipboard.writeText(url.value)
  }

  return (
    <div className="share-box">Share The URL
      <input className="share-btn-input" defaultValue={window.location.href} ref={refInput} />
      <div className = "share-btn-copy" onClick={copyLink}> Copy Link </div>
    </div>
  )
}

export default ShareBox
import React from 'react'

const Editor = ({ editorTitle, editorId, editorClass, setNewPenIframe }) => {
  return (
    <div className="edit-zone">
      <div className="edit-zone-bar">
        <div>{editorTitle}</div>
      </div>
      <div id = {editorId} className = {editorClass} onBlur={ ()=>{
        setNewPenIframe(false) } }></div>
    </div>
  )
}

export default Editor
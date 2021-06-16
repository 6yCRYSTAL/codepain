import React from 'react'

const Editor = ( { editorTitle, editorId, editorClass,setNewPenIframe }) => {
  function HandleEditorContent() {
    setNewPenIframe(false)
  }
  return (
    <div className="edit-zone">
      <div className="edit-zone-bar">
        <div>{editorTitle}</div>
      </div>
      <div id = {editorId} className = {editorClass} onBlur={ HandleEditorContent }></div>
    </div>
  )
}

export default Editor
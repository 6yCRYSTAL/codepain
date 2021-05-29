import React from 'react'
import '../../styles/index_editor.css'

const Editor = ( { editorTitle, editorId, editorClass }) => {

  return (
    <div className="edit-zone">
      <div className="edit-zone-bar">
        <div>{editorTitle}</div>
      </div>
      <div id = {editorId} className = {editorClass}></div>
    </div>
  )
}

export default Editor
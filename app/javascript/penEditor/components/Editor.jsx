import React from 'react'
import '../../styles/index_editor.css'

import EditorTopBar from './EditorTopBar'

const Editor = ( { editorTitle, editorId, editorClass }) => {

  return (
    <div className="edit-zone">
      <EditorTopBar title = {editorTitle} />
      <div id = {editorId} className = {editorClass}></div>
    </div>
  )
}

export default Editor
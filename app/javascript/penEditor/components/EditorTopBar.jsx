import React from 'react'
import '../../styles/index_editor.css'


const EditorTopBar = ( {title} ) => {

  return (
    <div className="edit-zone-bar">
      <button className="edit-setting"><span><i className="fas fa-cog"></i></span></button>
      <div>{title}</div>
      <button className="edit-selector"><span><i className="fas fa-angle-down"></i></span></button>
    </div>
  )
}

export default EditorTopBar
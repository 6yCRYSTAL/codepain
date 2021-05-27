import React from 'react';
import '../../styles/new.css'

const EditorConsole = () => {
  return (
    <div className="edit-console-container" initialSize="200px">
      <div className="edit-console-bar">
        Console
        <button className="edit-console-clear">clear</button>
        <button className="edit-console-close">X</button>
      </div>
      <div className="edit-console"></div>
    </div>
  )
}

export default EditorConsole





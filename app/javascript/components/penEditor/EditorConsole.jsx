import React from 'react';

const EditorConsole = () => {

  function clearConsole() {
    let console = document.querySelector('.edit-console')
    console.textContent = ""
  }

  return (
    <div className="edit-console-container">
      <div className="edit-console-bar">
        Console
        <button className="edit-console-clear" onClick={clearConsole}>clear</button>
        {/* <button className="edit-console-close">X</button> */}
      </div>
      <div className="edit-console"></div>
    </div>
  )
}

export default EditorConsole
import React, { useState } from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

import Editor from './Editor'
import EditorConsole from './EditorConsole'
import Iframe from './Iframe'

const MainEditor = ( ) => {

  const [showConsole, setShowConsole] = useState(false)
  const isOpen = showConsole ? "consoleOpen" : "consoleClose"

  const [isDragging, setDraggingState] = useState(false)

  function showConsoleBox() {
    setShowConsole(!showConsole)
  }

  var atDragging = () => {
    setDraggingState(!isDragging)
  }

  return(
    <>
      <SplitPane split="horizontal" defaultSize={"50%"} className="SplitPane-horizontal"
                 onDragStarted={atDragging} onDragFinished={atDragging}>

        <SplitPane split="vertical" minSize={"33%"}>
          {/* editor html */}
          <Editor editorTitle={"HTML"} editorId={"editor--html"} editorClass={"editor-code editor-html"}/>
          <SplitPane split="vertical" minSize={50} defaultSize={"50%"} primary="second">
            {/* editor css */}
            <Editor editorTitle={"CSS"} editorId={"editor--css"} editorClass={"editor-code editor-css"}/>
            {/* editor js */}
            <Editor editorTitle={"JavaScript"} editorId={"editor--js"} editorClass={"editor-code editor-js"} />
          </ SplitPane>
        </ SplitPane>

        <div className={isOpen}>
          <SplitPane split="horizontal" minSize={"50%"} className="iframeAndConsole"
                      onDragStarted={atDragging} onDragFinished={atDragging}>
              <div className="edit-render-result" style={{pointerEvents: isDragging ? 'none' : 'auto'}}>
                <Iframe />
              </div>
              <EditorConsole />
          </ SplitPane>
        </div>

      </ SplitPane>

      <button onClick={showConsoleBox} id="console-btn" className="fake-console"> Console </button>
    </>
  )
}

export default MainEditor
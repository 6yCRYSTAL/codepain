import React, { useState } from 'react'
import { SplitPane } from "react-collapse-pane";
import 'styles/index_editor.scss'

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
    <div className="horizontalView">
      <SplitPane
        split="horizontal"
        hooks={{ onDragStarted: atDragging, onSaveSizes: atDragging }}
        resizerOptions={{
          css: {
            height: '10px',
            background: '#333642',
          },
          hoverCss: {
            height: '10px',
            background: '#333642',
          },
          grabberSize: '1rem',
        }}>

        <SplitPane
          split="vertical"
          collapse={true}
          resizerOptions={{
            css: {
              width: '10px',
              background: '#333642',
            },
            hoverCss: {
              width: '10px',
              background: '#333642',
            },
            grabberSize: '1rem',
          }}>
          {/* editor html */}
          <Editor
            editorTitle={"HTML"}
            editorId={"editor--html"}
            editorClass={"editor-code editor-html"}/>
          {/* editor css */}
          <Editor
            editorTitle={"CSS"}
            editorId={"editor--css"}
            editorClass={"editor-code editor-css"}/>
          {/* editor js */}
          <Editor
            editorTitle={"JavaScript"}
            editorId={"editor--js"}
            editorClass={"editor-code editor-js"} />
        </ SplitPane>

        <div className={isOpen}>
          <SplitPane
            split="horizontal"
            className="iframeAndConsole"
            resizerOptions={{
              css: {
                height: '10px',
                background: '#131417',
              },
              hoverCss: {
                height: '10px',
                background: '#333642',
              },
              grabberSize: '1rem',
            }}
            hooks={{ onDragStarted: atDragging, onSaveSizes: atDragging }}>

            <div className="edit-render-result" style={{pointerEvents: isDragging ? 'none' : 'auto'}}>
              <Iframe />
            </div>
              <EditorConsole />

          </ SplitPane>
        </div>

      </ SplitPane>

      <button onClick={showConsoleBox} id="console-btn" className="fake-console"> Console </button>
    </div>
  )
}

export default MainEditor
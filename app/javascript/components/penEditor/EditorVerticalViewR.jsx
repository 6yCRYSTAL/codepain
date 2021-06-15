import React, { useState } from 'react'
import { SplitPane } from "react-collapse-pane";
import 'styles/index_editor.scss'

import Editor from './Editor'
import EditorConsole from './EditorConsole'
import Iframe from './Iframe'

const EditorVerticalViewR = ( ) => {

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
    <div className="verticalViewR" data-editor="right">
      <SplitPane
        split="vertical"
        hooks={{ onDragStarted: atDragging, onSaveSizes: atDragging }}
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

        <div className={isOpen}>
          <SplitPane
            split="horizontal"
            className="iframeAndConsole"
            resizerOptions={{
              css: {
                height: '5px',
                background: '#131417',
              },
              hoverCss: {
                height: '5px',
                background: '#333642',
              },
              grabberSize: '.5rem',
            }}
            hooks={{ onDragStarted: atDragging, onSaveSizes: atDragging }}>

            <div className="edit-render-result" style={{pointerEvents: isDragging ? 'none' : 'auto'}}>
              <Iframe />
            </div>
              <EditorConsole />

          </ SplitPane>
        </div>

        <SplitPane
          split="horizontal"
          collapse={true}
          resizerOptions={{
            css: {
              height: '5px',
              background: '#333642',
            },
            hoverCss: {
              height: '5px',
              background: '#333642',
            },
            grabberSize: '.5rem',
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

      </ SplitPane>

      <button onClick={showConsoleBox} id="console-btn" className="fake-console"> Console </button>
    </div>
  )
}

export default EditorVerticalViewR
import React, { useEffect, useState } from 'react'
import { SplitPane } from "react-collapse-pane"
import 'styles/index_editor.scss'
import styled from '@emotion/styled'

import Editor from './Editor'
import EditorConsole from './EditorConsole'
import Iframe from './Iframe'

const MainEditor = ( ) => {

  const [showConsole, setShowConsole] = useState(false)
  const isOpen = showConsole ? "consoleOpen" : "consoleClose"
  const [isDragging, setDraggingState] = useState(false)
  const [isNewPenIframe, setNewPenIframe] = useState(false)
  const NewPenIframe = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #b7bbc8;
  `
  useEffect(() =>{
    if(window.location.pathname === '/pen'){
      setNewPenIframe(true)
    }
  },[])
  function showConsoleBox() {
    setShowConsole(!showConsole)
  }

  var atDragging = () => {
    setDraggingState(!isDragging)
  }

  return(
    <>
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
            editorClass={"editor-code editor-html"}
            setNewPenIframe = { setNewPenIframe }
          />
          {/* editor css */}
          <Editor
            editorTitle={"CSS"}
            editorId={"editor--css"}
            editorClass={"editor-code editor-css"}
            setNewPenIframe = { setNewPenIframe }
          />
          {/* editor js */}
          <Editor
            editorTitle={"JavaScript"}
            editorId={"editor--js"}
            editorClass={"editor-code editor-js"}
            setNewPenIframe = { setNewPenIframe }
          />
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
              <Iframe
                isNewPenIframe = { isNewPenIframe }
              />
              {
                isNewPenIframe &&
                <NewPenIframe>
                  be honest with yourself
                </NewPenIframe>
              }
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
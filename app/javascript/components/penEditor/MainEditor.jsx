import React, { useState } from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

import Editor from './Editor'
import EditorConsole from './EditorConsole'
import Iframe from './Iframe'

const MainEditor = ( ) => {

  const [showConsole, setShowConsole] = useState(true)
  const [closeIframe, setCloseIframe] = useState(false)

  const showConsoleBox = () => {
    setShowConsole(!showConsole)
    setCloseIframe(!closeIframe)
  }
  const consoleBtnStlye = {
    position: "absolute",
    bottom: "5px",
    left: "15px",
    zIndex: "100",
    color: "var(--light-gray)",
    fontSize: "var(--text-s-p)",
    padding: "2px 7px",
    backgroundColor: "var(--primary-gray-4)",
    borderRadius: "2px",
  }

  return(
    <>
    <SplitPane split="horizontal" minSize={"50%"} className="SplitPane-horizontal">

      <SplitPane split="vertical" minSize={"33%"}>
        {/* editor html */}
        <Editor editorTitle={"HTML"} editorId={"editor--html"} editorClass={"editor-code editor-html"}/>
        <SplitPane split="vertical" minSize={"50%"}>
          {/* editor css */}
          <Editor editorTitle={"CSS"} editorId={"editor--css"} editorClass={"editor-code editor-css"}/>
          {/* editor js */}
          <Editor editorTitle={"JavaScript"} editorId={"editor--js"} editorClass={"editor-code editor-js"}/>
        </ SplitPane>
      </ SplitPane>

      {
        closeIframe && <Iframe />
      }
      {
        showConsole &&
        <SplitPane split="horizontal" minSize={"50%"}>
          <Iframe />
          <EditorConsole />
        </ SplitPane>
      }
    </ SplitPane>

    <button onClick={showConsoleBox} id="console-btn" className="btn-console fake-console" style={consoleBtnStlye}> Console </button>
    </>
  )
}

export default MainEditor
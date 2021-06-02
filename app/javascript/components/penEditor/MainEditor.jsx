import React, { useState } from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

import Editor from './Editor'
import EditorConsole from './EditorConsole'
import Iframe from './Iframe'

const MainEditor = ( ) => {

  const [showConsole, setShowConsole] = useState(false)
  const isOpen = showConsole ? "consoleOpen" : "consoleClose"

  function showConsoleBox() {
    setShowConsole(!showConsole)
  }


  return(
    <>
      <SplitPane split="horizontal" minSize={"50%"} className="SplitPane-horizontal">
        <SplitPane split="vertical" minSize={"33%"}>
          {/* editor html */}
          <Editor editorTitle={"HTML"} editorId={"editor--html"} editorClass={"editor-code editor-html"}/>
          <SplitPane split="vertical" minSize={100} defaultSize={300} primary="second" className="right-spliter">
            {/* editor css */}
            <Editor editorTitle={"CSS"} editorId={"editor--css"} editorClass={"editor-code editor-css"}/>
            {/* editor js */}
            <Editor editorTitle={"JavaScript"} editorId={"editor--js"} editorClass={"editor-code editor-js"} />
          </ SplitPane>
        </ SplitPane>

        <div className={isOpen}>
          <SplitPane split="horizontal" className="iframeAndConsole">
              <Iframe />
              <EditorConsole />
          </ SplitPane>
        </div>
      </ SplitPane>

      <button onClick={showConsoleBox} id="console-btn" className="fake-console"> Console </button>
    </>
  )
}

export default MainEditor
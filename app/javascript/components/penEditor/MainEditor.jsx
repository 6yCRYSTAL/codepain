import React from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

import Editor from './Editor'
import EditorConsole from './EditorConsole'

const MainEditor = ( ) => {

  const [showConsole, setShowConsole] = React.useState(false)
  const [closeIframe, setCloseIframe] = React.useState(true)

  const showConsoleBox = () => {
    setShowConsole(!showConsole)
    setCloseIframe(!closeIframe)

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

      { closeIframe &&
        <iframe id="edit--result" className="edit-render-result" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>
      }
      { showConsole &&
        <SplitPane split="horizontal" minSize={"50%"}>
          <iframe id="edit--result" className="edit-render-result" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>
          <EditorConsole />
        </ SplitPane> }
    </ SplitPane>

    <button onClick={showConsoleBox} className="fake-console" style={{backgroundColor: "gray", position: "absolute"}}> FakeConsole</button>
    </>
  )
}

export default MainEditor
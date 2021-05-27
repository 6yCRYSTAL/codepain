import React from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

import Editor from './Editor'
import EditorConsole from './EditorConsole';

const IndexEditor = () => {
  return(

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

      <SplitPane split="horizontal">
          <iframe id="edit--result" className="edit-render-result" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>
          <EditorConsole initialSize="100px" />
      </SplitPane>

      {/* <iframe id="edit--result" className="edit-render-result" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe> */}
      {/* <div class="edit-console-container">
        <div class="edit-console-bar">
          Console
          <button class="edit-console-clear">clear</button>
          <button class="edit-console-close">X</button>
        </div>
        <div class="edit-console"></div>
      </div> */}
      </ SplitPane>
  )
}

export default IndexEditor
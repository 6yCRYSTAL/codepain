import React from 'react'
import SplitPane from 'react-split-pane'
import '../../styles/index_editor.css'

const IndexEditor = () => {
  return(
    <SplitPane split="horizontal" minSize={"50%"} className="SplitPane-horizontal">
      <SplitPane split="vertical" minSize={"33%"}>
        <div className="edit-zone edit-html-zone">
          <div className="edit-zone-bar">
            <button className="edit-setting"><span><i className="fas fa-cog"></i></span></button>
            <div>HTML</div>
            <button className="edit-selector"><span><i className="fas fa-angle-down"></i></span></button>
          </div>
          <div id="editor--html" className="editor-code editor-html"></div>
        </div>
        <SplitPane split="vertical" minSize={"50%"}>
          <div className="edit-zone edit-css-zone">
            <div className="edit-zone-bar">
              <button className="edit-setting"><span><i className="fas fa-cog"></i></span></button>
              <div>CSS</div>
              <button className="edit-selector"><span><i className="fas fa-angle-down"></i></span></button>
            </div>
            <div id="editor--css" className="editor-code editor-css"></div>
          </div>

          <div className="edit-zone edit-js-zone">
            <div className="edit-zone-bar">
              <button className="edit-setting"><span><i className="fas fa-cog"></i></span></button>
              <div>JS</div>
              <button className="edit-selector"><span><i className="fas fa-angle-down"></i></span></button>
            </div>
            <div id="editor--js" className="editor-code editor-js"></div>
          </div>
        </SplitPane>

      </SplitPane>
      <iframe id="edit--result" className="edit-render-result" sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>
    </SplitPane>
  )
}

export default IndexEditor
import React from 'reaact'
import SplitPane from 'react-split-pane'
import '../../styles/editor.css'

const IndexEditor = () => {
  return(
    <SplitPane split="horizontal" minSize={"50%"}>
        <div>HTML</div>
        <div>CSS</div>
    </SplitPane>
  )
}

export default IndexEditor
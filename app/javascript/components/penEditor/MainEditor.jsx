import React, { useState }from 'react'
import EditorHorizontalView from './EditorHorizontalView'
import EditorVerticalViewR from './EditorVerticalViewR'
import EditorVerticalViewL from './EditorVerticalViewL'

const MainEditor = () => {

  const [editorLeft, setEditorLeft] = useState(true)
  const [editorMiddle, setEditorMiddle] = useState(false)
  const [editorRight, setEditorRight] = useState(false)

  return(
    <>
      { editorLeft && <EditorVerticalViewL />}
      { editorMiddle && <EditorHorizontalView />}
      { editorRight && <EditorVerticalViewR />}
    </>
  )
}

export default MainEditor
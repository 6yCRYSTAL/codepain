import React from 'react'

const btnStlye = {
  color: "white",
  fontSize: "1rem",
  margin: "0 1rem 0"
}

const ChangeViewBtns = () => {

  function changeEditorView(e) {
    let currentView = e.target.dataset.btn

    switch(currentView){
      case 'left':
        console.log("left");
        setEditorLeft(true)
        setEditorMiddle(false)
        setEditorRight(false)

        break
      case 'middle':
        console.log("middle");
        setEditorLeft(false)
        setEditorMiddle(true)
        setEditorRight(false)

        break
      case 'right':
        console.log("right");
        setEditorLeft(false)
        setEditorMiddle(false)
        setEditorRight(true)
        break
    }
  }

  return (
    <div className="changeViewBtnWrapper">
      <button className="changeViewBtnL" data-btn="left" style={btnStlye} onClick={changeEditorView}>Left</button>
      <button className="changeViewBtnM " data-btn="middle" style={btnStlye} onClick={changeEditorView}>Middle</button>
      <button className="changeViewBtnR" data-btn="right" style={btnStlye} onClick={changeEditorView}>Right</button>
    </div>
   )
}

export default ChangeViewBtns



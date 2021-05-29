import React from 'react'
import ReactDOM from 'react-dom'

import MainEditor from '../../components/penEditor/MainEditor'

document.addEventListener('turbolinks:load', () => {
  const indexEditor = document.querySelector('#index-editor')
  if( MainEditor ){
    ReactDOM.render(
      <MainEditor />,
      indexEditor
    )
  }
})
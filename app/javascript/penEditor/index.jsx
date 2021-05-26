import React from 'react'
import ReactDOM from 'react-dom'

import IndexEditor from './components/IndexEditor'

document.addEventListener('turbolinks:load', () => {
  const indexEditor = document.querySelector('#index-editor')
  if( indexEditor ){
    ReactDOM.render(
      <IndexEditor />,
      indexEditor
    )
  }
})



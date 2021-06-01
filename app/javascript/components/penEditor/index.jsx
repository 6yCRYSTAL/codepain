import React from 'react'
import ReactDOM from 'react-dom'

import MainEditor from './MainEditor'
import MainFooter from './Footer'


document.addEventListener('turbolinks:load', () => {
  const indexEditor = document.querySelector('#index-editor')
  if( MainEditor ){
    ReactDOM.render(
      <MainEditor />,
      indexEditor
    )
  }

  const editFooter = document.querySelector('.edit-footer')
  if( editFooter ){
    ReactDOM.render(
      <MainFooter />,
      editFooter
    )
  }
})

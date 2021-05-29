import React from 'react'
import ReactDOM from 'react-dom'

import MainEditor from '../../components/penEditor/MainEditor'
import MainFooter from '../../components/penEditor/Footer'


document.addEventListener('turbolinks:load', () => {
  const indexEditor = document.querySelector('#index-editor')
  if( MainEditor ){
    ReactDOM.render(
      <MainEditor />,
      indexEditor
    )
  }
})

document.addEventListener('turbolinks:load', () => {
  const editFooter = document.querySelector('.edit-footer')
  if( editFooter ){
    ReactDOM.render(
      <MainFooter />,
      editFooter
    )
  }
})
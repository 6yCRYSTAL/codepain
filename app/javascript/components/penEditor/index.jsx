import React from 'react'
import ReactDOM from 'react-dom'

import MainEditor from './MainEditor'
import MainFooter from './Footer'
import SettingAlert from './SettingAlert'


document.addEventListener('turbolinks:load', () => {
  const indexEditor = document.querySelector('#index-editor')
  if(indexEditor){
    ReactDOM.render(
      <MainEditor />,
      indexEditor
    )
  }

  const editFooter = document.querySelector('.edit-footer')
  if(editFooter){
    ReactDOM.render(
      <MainFooter />,
      editFooter
    )
  }

  const settingButton = document.querySelector('.btn-settings')
  if (settingButton) {
    settingButton.addEventListener('click', SettingAlert)
  }
})
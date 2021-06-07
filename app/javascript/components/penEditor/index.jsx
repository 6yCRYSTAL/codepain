import React from 'react'
import ReactDOM from 'react-dom'

import MainEditor from './MainEditor'
import MainFooter from './Footer'
import SettingAlertOwner from './SettingAlertOwner'
import SettingAlertOthers from './SettingAlertOthers'


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

  const settingButton = document.querySelector('#btn-settings')
  const updateButton = document.querySelector('#btn-update')
  if (settingButton) {
    if (updateButton) {
      settingButton.addEventListener('click', SettingAlertOwner)
    }
    else {
      settingButton.addEventListener('click', SettingAlertOthers)
    }
  } else {
    localStorage.removeItem('css')
    localStorage.removeItem('js')
  }
})
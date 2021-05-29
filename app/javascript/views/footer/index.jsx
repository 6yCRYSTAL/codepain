import React from 'react'
import ReactDOM from 'react-dom'

import MainFooter from '../../components/footer/MainFooter'

document.addEventListener('turbolinks:load', () => {
  const editFooter = document.querySelector('.edit-footer')
  if( editFooter ){
    ReactDOM.render(
      <MainFooter />,
      editFooter
    )
  }
})
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import GridItem from './GridWrap'

document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.pens-grid');
  const FeaturesModal = document.querySelectorAll('.modal-entry');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
})
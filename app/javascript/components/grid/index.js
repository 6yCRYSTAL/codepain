import React from 'react'
import ReactDOM from 'react-dom'
import GridItem from './GridWrap'
import FeaturesAlert from './FeaturesAlert'

document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.pens-grid');
  const FeaturesModal = document.querySelector('#modal-entry');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
})
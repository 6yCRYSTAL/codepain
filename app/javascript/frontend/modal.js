document.addEventListener('turbolinks:load',function(){
  // Get open modal button
  const modalBtnAll = document.querySelectorAll('#modal-btn')
  modalBtnAll.forEach(btn => {
    btn.addEventListener('click', openModal)
  })
  function openModal(e) {
    const pen_info = e.currentTarget.dataset
    const featureGridContent = document.querySelector(`#grid-content-${pen_info.url}`)
    if (featureGridContent) {
      featureGridContent.style.zIndex = "100"
      document.querySelector(`#iframe-${pen_info.url}`).srcdoc = document.querySelector(`#iframe-${pen_info.url}`).srcdoc
    }
    let modal = document.querySelector(`.modal.open-modal-${pen_info.url}`)
    let penURL = pen_info.url
    let username = pen_info.username
    // change URL at window location
    let originLocation = window.location.href
    history.replaceState({username, penURL}, `Selected: ${username}, ${penURL}`, `/${username}/pen/${penURL}`)
    modal.style.display = 'flex'
    modal.addEventListener('click', closeModal)
    // add lock body bg
    document.querySelector('body').classList.add('fixed');
    // listen for outside click
    function closeModal(e) {
      if (e.target === this) {
        const featureGridContent = document.querySelector(`#grid-content-${e.target.dataset.url}`)
        if (featureGridContent) {
          featureGridContent.style.zIndex = ""
        }
        e.target.style.display = 'none'
        // back to your-work
        history.replaceState(null, 'your-work', `${originLocation}`)
        // remove lock body bg
        document.querySelector('body').classList.remove('fixed');
      }
    }
  }
})

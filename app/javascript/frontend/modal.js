document.addEventListener('turbolinks:load',function(){
  // Get modal element
  const modalAll = document.querySelectorAll('#modal')
  // Get open modal button
  const modalBtnAll = document.querySelectorAll('#modal-btn')
  modalBtnAll.forEach(btn => {
    btn.addEventListener('click', openModal)
  })
  function openModal(e) {
    if (e.currentTarget.dataset.url) {
      document.querySelector(`#a${e.currentTarget.dataset.url}`).style.zIndex = "100"
    }
    let modal = this.nextElementSibling
    let penURL = modal.dataset.url
    let username = modal.children[0].children[0].children[0].lastElementChild.lastElementChild.textContent.trim()
    // change URL at window location
    history.pushState({username, penURL}, `Selected: ${username}, ${penURL}`, `./${username}/pen/${penURL}`)
    modal.style.display = 'flex'
    modal.addEventListener('click', closeModal)
    // add lock body bg
    document.querySelector('body').classList.add('fixed');
  }
  // listen for outside click
  function closeModal(e) {
    if (e.target === this) {
      if (e.target.dataset.url) {
        document.querySelector(`#a${e.target.dataset.url}`).style.zIndex = ""
      }
      e.target.style.display = 'none'
      // back to your-work
      history.replaceState(null, 'your-work', `${location.origin}/your-work`)
      // remove lock body bg
      document.querySelector('body').classList.remove('fixed');
    }
  }
})

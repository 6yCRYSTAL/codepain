document.addEventListener('turbolinks:load',function(){
  // Get modal element
  const modalAll = document.querySelectorAll('#modal')
  // Get open modal button
  const modalBtnAll = document.querySelectorAll('#modal-btn')
  modalBtnAll.forEach(btn => {
    btn.addEventListener('click', openModal)
  })
  function openModal(e) {
    let modal = this.nextElementSibling
    let penURL = modal.dataset['url']
    let username = modal.children[0].children[0].textContent.trim()
    // change URL at window location
    history.pushState({username, penURL}, `Selected: ${username}, ${penURL}`, `./${username}/details/${penURL}`)
    modal.style.display = 'block'
    modal.addEventListener('click', closeModal)
    document.querySelector('body').style.overflow = "hidden"
  }
  // listen for outside click
  function closeModal(e) {
    if (e.target === this) {
      e.target.style.display = 'none'
      // back to your-work
      history.replaceState(null, 'your-work', `${window.location.origin}/your-work`)
      document.querySelector('body').style.overflow = "auto"
    }
  }
})

document.addEventListener('turbolinks:load', () => {
  // Get modal element
  const modalAll = document.querySelectorAll('#modal')
  // Get open modal button
  const modalBtnAll = document.querySelectorAll('#modal-btn')

  modalBtnAll.forEach(btn => {
    btn.addEventListener('click', openModal)
  })

  function openModal(e) {
    let modal = this.nextElementSibling
    modal.style.display = 'block'
    modal.addEventListener('click', closeModal)
  }
  // listen for outside click
  function closeModal(e) {
    if (e.target === this) {
      this.style.display = 'none'
    }
  }
})
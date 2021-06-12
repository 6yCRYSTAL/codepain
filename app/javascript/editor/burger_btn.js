document.addEventListener('turbolinks:load', () => {
  let burgerBtn = document.querySelector('.burger-btn')

  if (burgerBtn) {
    window.addEventListener('click', function(e){
      if (burgerBtn.contains(e.target)) {
        burgerBtn.classList.toggle('burger-btn-open')
        burgerBtn.nextElementSibling.classList.toggle('mobile-edit-btn')
      } else {
        burgerBtn.classList.remove('burger-btn-open')
        burgerBtn.nextElementSibling.classList.remove('mobile-edit-btn')
      }
    })
  }
})
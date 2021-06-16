document.addEventListener('turbolinks:load', () => {
  let burgerBtn = document.querySelector('.burger-btn')
  let editBtnWrap = document.querySelector('.edit-btn-wrap')
  if (burgerBtn) {
    window.addEventListener('click', function(e){
      if (burgerBtn.contains(e.target)) {
        burgerBtn.classList.toggle('burger-btn-open')
        burgerBtn.nextElementSibling.classList.toggle('mobile-edit-btn')
      }else if(editBtnWrap.contains(e.target)){
        burgerBtn.classList.add('burger-btn-open')
        burgerBtn.nextElementSibling.classList.add('mobile-edit-btn')
      } else {
        burgerBtn.classList.remove('burger-btn-open')
        burgerBtn.nextElementSibling.classList.remove('mobile-edit-btn')
      }
    })
  }
})
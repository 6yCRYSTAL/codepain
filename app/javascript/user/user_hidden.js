const emailFormToggle = () => {
  document.querySelector('.email-signup-form').classList.toggle('hidden')
  // console.log('123')
}


document.addEventListener('turbolinks:load', () => {
  document.querySelector('.button-email-signup').addEventListener('click', emailFormToggle)
})
const emailFormToggle = () => {
  document.querySelector('.email-signup-form').classList.toggle('hidden')
}

document.addEventListener('turbolinks:load', () => {
  const emailSignupButton = document.querySelector('.button-email-signup')

  if (emailSignupButton) {
    emailSignupButton.addEventListener('click', emailFormToggle)
  }
})
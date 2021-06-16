const emailFormToggle = () => {
  const emailSignupForm = document.querySelector('.email-signup-form')
  const passwordResetForm = document.querySelector('.password-reset-form')

  if (emailSignupForm || passwordResetForm) {
    (emailSignupForm || passwordResetForm).classList.toggle('hide')
  }
}

document.addEventListener('turbolinks:load', () => {
  const emailSignupButton = document.querySelector('.button-email-signup')
  const passwordResetLink = document.querySelector('.forgot-password-link')

  if (emailSignupButton || passwordResetLink) {
    (emailSignupButton || passwordResetLink).addEventListener('click', emailFormToggle)
  }
})
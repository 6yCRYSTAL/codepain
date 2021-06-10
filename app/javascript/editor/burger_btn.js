document.addEventListener('turbolinks:load', () => {
  let burgerBtn = document.querySelector('.burgerBtn')
  let headerBtn = document.querySelectorAll('.edit-btn-header > button')

  if( burgerBtn && headerBtn){
    // burgerBtn.addEventListener('click', () => {
    //   headerBtn.forEach( (btn) => {
    //     btn.classList.toggle('open')
    //   })
    // })
    window.addEventListener('click', function(e){
      if(burgerBtn.contains(e.target)){
        headerBtn.forEach( (btn) => {
          btn.classList.toggle('open')
        })
      }else {
        headerBtn.forEach( (btn) => {
          btn.classList.remove('open')
        })
      }
    })

  }
})
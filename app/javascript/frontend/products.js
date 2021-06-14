document.addEventListener('turbolinks:load',function(){
  let navBtn = document.querySelectorAll('.nav-rwd > button')

  if (navBtn) {
    navBtn.forEach( (btn) => {
      btn.addEventListener('click', function(){
        let clickedBtn = this.dataset.item
        let itemContent = document.querySelectorAll(`.${clickedBtn}`)

        document.querySelectorAll('th').forEach( (th) =>{
          th.classList.remove('on')
        })
        document.querySelectorAll('td').forEach( (td) =>{
          td.classList.remove('on')
        })

        itemContent.forEach( (item)=> {
          if (clickedBtn == item.dataset.content) {
            item.classList.add('on')
          }
        })
      })
    })
  }
})
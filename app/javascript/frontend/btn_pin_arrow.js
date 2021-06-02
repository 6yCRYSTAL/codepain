document.addEventListener('turbolinks:load' , function(){
  const PinArrowBtn = document.querySelector('.btn-pin-arrow');
  if (PinArrowBtn){
  let isClose = true
  PinArrowBtn.addEventListener('click', function(){
    let listDiv = document.querySelector('.extend')
    
    if (isClose){
      listDiv.classList.add('appear')
      isClose = false
    }else{
      listDiv.classList.remove('appear')
      isClose = true
    }
  })
}
const closeBtns = document.querySelectorAll('.item')
  if (closeBtns){
    closeBtns.forEach((btn)=>{
      btn.addEventListener('click',function(e){
        e.currentTarget.parentNode.remove()
      })
    })
  }
})
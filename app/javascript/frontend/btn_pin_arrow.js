document.addEventListener('turbolinks:load' , function(){
  let isClose = true
  document.querySelector('.btn-pin-arrow').addEventListener('click', function(){
    let listDiv = document.querySelector('.extend')
    console.log('123')
    
    if (isClose){
      listDiv.classList.add('appear')
      isClose = false
    }else{
      listDiv.classList.remove('appear')
      isClose = true
    }
  })
  
  document.querySelectorAll('.delete').forEach((x)=>{
    x.addEventListener('click',function(e){
      e.target.parentNode.remove('li')
    })
  })
})
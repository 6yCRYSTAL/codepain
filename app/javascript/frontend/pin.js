document.addEventListener('turbolinks:load', () => {
  document.querySelector('.btn-pinned').addEventListener('click', function(){
    const pinBtn= document.querySelector('.btn-pinned')
    if(pinBtn.classList.contains('btn-pinned-blue')){
      pinBtn.classList.remove('btn-pinned-blue')
    }else{
      pinBtn.classList.add('btn-pinned-blue')
    }
  })
})
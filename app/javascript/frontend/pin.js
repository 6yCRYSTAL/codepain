document.addEventListener('turbolinks:load', () => {
  document.querySelector('.btn-pinned').addEventListener('click', function(){
    document.querySelector('.btn-pinned').classList.add('btn-pinned-blue')
  })
  document.querySelector('.btn-pinned').addEventListener('click', function(){
    document.querySelector('.btn-pinedd').classList.remove('btn-pinned-blue')
  })
})


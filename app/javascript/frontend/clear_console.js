document.addEventListener('turbolinks:load',function(){
  let iframeGrid = document.querySelector('.iframe-grid')

  if (iframeGrid) {
    setTimeout( () => {
      console.clear()
    }, 1000)
  }
})
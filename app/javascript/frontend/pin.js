import Rails from "@rails/ujs"
import ax from "axios"
document.addEventListener('turbolinks:load', () => {
  let btnPinned= document.querySelector('.btn-pinned');
  if(btnPinned){
    btnPinned.addEventListener('click', function(){
      console.log('123')
      ax.post('/api/v1/pens/:random_url/pin')
      .then((data)=>{
        console.log(data.data)
      })
      // Rails.ajax({
      //   url: '/api/v1/pens/pins',
      //   type: 'get',
      //   // headers: {
      //   // dataType: 'json',
      //   data:"",
      //   success: function(data){
      //     console.log(data)
      //   }
      // })
      const pinBtn= document.querySelector('.btn-pinned')
      if(pinBtn.classList.contains('btn-pinned-blue')){
        pinBtn.classList.remove('btn-pinned-blue')
      }else{
        pinBtn.classList.add('btn-pinned-blue')
      }
    })
  }
})

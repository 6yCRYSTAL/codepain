// usermenu nav 點擊頭像
window.addEventListener('DOMContentLoaded',function(){
  const userMenuBtn = document.getElementById('userMenu-btn');
  userMenuBtn.addEventListener('click',(e)=>{
    e.currentTarget.nextElementSibling.classList.toggle('active')
  })
})

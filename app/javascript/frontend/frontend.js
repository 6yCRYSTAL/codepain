document.addEventListener('turbolinks:load',function(){
  const UserMenuBtn = document.getElementById('userMenu-btn');
  const SideBtn = document.querySelector('.sidebar-toggle-btn button');
  const MainSidebar = document.querySelector('.main-sidebar');
  const Container = document.querySelector('.container');
  const OnClose = localStorage.getItem('onClose');
  const btn = document.querySelector('#btn');

  // 登入頁-使用者選單
  if (UserMenuBtn) {
    UserMenuBtn.addEventListener('click',(e)=>{
      e.currentTarget.nextElementSibling.classList.toggle('active');
    });
  }
  // 全站-側選單
  if (Container) {
    let sidebarOpen = ()=>{
      Container.classList.remove('close-sidebar');
      Container.classList.add('open-sidebar');
      document.querySelector('.sidebar-line').classList.remove('sidebar-line-active');
    }
    let sidebarClose = ()=>{
      Container.classList.add('close-sidebar');
      Container.classList.remove('open-sidebar');
      document.querySelector('.sidebar-line').classList.add('sidebar-line-active');
    }

    if (OnClose) {
      sidebarClose();
    }else{
      sidebarOpen();
    }

    SideBtn.addEventListener('click',(e)=>{
      e.currentTarget.lastElementChild.classList.toggle('rotate-arrow');
      // 判斷有關掉
      if (Container.className === 'container close-sidebar') {
        sidebarOpen();
        MainSidebar.classList.add('main-sidebar-an');
        localStorage.setItem('onClose','');
      }else{
        sidebarClose();
        MainSidebar.classList.add('main-sidebar-an');
        localStorage.setItem('onClose','yes');
      }
    });
  }
  const input = document.querySelector('#inputTitle')
  btn.addEventListener('click', () => {
    input.disabled = false
    input.focus()
    btn.style.display="none"
  })
  let allEvent = 0;
  input.addEventListener('keyup', (e) => {
    allEvent =  allEvent + 1;
    if(e.keyCode === 13 && (allEvent !== 3)){
      eventContent(e);
    }else{
      allEvent = 0;
    }
  })
  input.addEventListener('blur', (e) => {
    allEvent = allEvent + 2;
    if(allEvent !== 3){
      eventContent(e);
    }else{
      allEvent = 0;
    }
  })
  let eventContent = (e)=>{
    input.disabled = true
    btn.style.display="inline"
    let inputValue = e.target.value
    postData(inputValue)
  }



  function postData(inputValue) {
    console.log(inputValue);
    // axios.post('#', { name: inputValue })
    // .then((res) => { console.log(res) })
    // .catch((error) => { console.log(error) })
    
  }

  // function eventContent(e) {
  //   e.target.disabled = true
  //   btn.style.display="inline"
  //   let inputValue = e.target.value
  //   return inputValue
  //   // postData(inputValue);
  // }
  // function eventInput() {
    // var isTouchEnabled = true || false;
    // input.addEventListener(isTouchEnabled ? 'keyup' : 'blur' , (e) =>{
    // });
    //  let test = 0
    // 失去焦點
    // let count = 0;
    // input.addEventListener('blur', (e) => {
    //   test++
    //   eventContent(e);
    //   console.log(test);
    // })
   
    // input.addEventListener('keyup', (e) => {
    //   if(e.keyCode === 13){
    //     e.target.disabled = true
    //     btn.style.display="inline"
    //     let inputValue = e.target.value
    //     let ss= document.getElementById('dd')
    //     ss.textContent += inputValue
    //     // console.log(inputValue);
    //     // postData(inputValue);
        
    //   }
      
    // })

 
  // }


})
document.addEventListener('turbolinks:load',function(){
  const UserMenuBtn = document.getElementById('userMenu-btn');
  const SideBtn = document.querySelector('.sidebar-toggle-btn button');
  const MainSidebar = document.querySelector('.main-sidebar');
  const Container = document.querySelector('.container');
  const OnClose = localStorage.getItem('onClose');

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

    if (OnClose === 'true') {
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
        localStorage.setItem('onClose','false');
      }else{
        sidebarClose();
        MainSidebar.classList.add('main-sidebar-an');
        localStorage.setItem('onClose','true');
      }
    });
  }
})
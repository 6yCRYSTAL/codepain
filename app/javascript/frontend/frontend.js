document.addEventListener('turbolinks:load',function(){
  const UserMenuBtn = document.getElementById('userMenu-btn');
  const SideBtn = document.querySelector('.sidebar-toggle-btn button');
  const MainSidebar = document.querySelector('.main-sidebar');
  const Container = document.querySelector('.container');
  const OnCloseSidebar = localStorage.getItem('onClose');

  // 判斷頁面有值 進行按下菜單按鈕
  if (UserMenuBtn !== null) {
    UserMenuBtn.addEventListener('click',(e)=>{
      e.currentTarget.nextElementSibling.classList.toggle('active');
    });
  }

  // 開關測選單按鈕 
  let sidebarOpen = ()=>{
    Container.dataset.sidebarOpen = 'true';
    MainSidebar.dataset.sidebarOpen = 'true';
    document.querySelector('.sidebar-line').classList.remove('sidebar-line-active');
  }
  let sidebarClose = ()=>{
    Container.dataset.sidebarOpen = 'false';
    MainSidebar.dataset.sidebarOpen = 'false';
    document.querySelector('.sidebar-line').classList.add('sidebar-line-active');
  }

  if (OnCloseSidebar === 'true') {
    sidebarClose();
  }else{
    sidebarOpen();
  }
  SideBtn.addEventListener('click',()=>{
    if (MainSidebar.dataset.sidebarOpen === 'true') {
      sidebarClose();
      localStorage.setItem('onClose','true');
    }else{
      sidebarOpen();
      localStorage.setItem('onClose','false');
    }
  });
})
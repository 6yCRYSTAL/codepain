import GridListStyle from './gridList_btn.js'
document.addEventListener('turbolinks:load',function(){
  const UserMenuBtn = document.querySelector('#userMenu-btn');
  const SideBtn = document.querySelector('.sidebar-toggle-btn button');
  const MainSidebar = document.querySelector('.main-sidebar');
  const Container = document.querySelector('.container-left');
  const DeleteTab = document.querySelector('#tab-delete');
  const searchUsersFeatures = document.querySelector('.search-users-features')
  const YourWorkFeatures = document.querySelector('.your-work-features')
  const OnClose = localStorage.getItem('onClose');

  // 登入頁-使用者選單
  if (UserMenuBtn) {
    const UserMenuTopNav = document.querySelector('.userMenu-topnav');
    window.addEventListener('click', function(e){
      if (UserMenuBtn.contains(e.target)){
        UserMenuTopNav.classList.toggle('active');
      } else{
        UserMenuTopNav.classList.remove('active');
      }
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
    } else {
      sidebarOpen();
    }

    SideBtn.addEventListener('click',(e)=>{
      e.currentTarget.lastElementChild.classList.toggle('rotate-arrow');
      // 判斷有關掉
      if (Container.className === 'container-left close-sidebar') {
        sidebarOpen();
        MainSidebar.classList.add('main-sidebar-an');
        localStorage.setItem('onClose','');
      }else{
        sidebarClose();
        MainSidebar.classList.add('main-sidebar-an');
        localStorage.setItem('onClose','yes');
      }
    })
  }

  // 偵測網址 tab 樣式
  if (DeleteTab) {
    let hashName = location.search;
    const YourWorkTab = document.querySelector('.your-work-tab');

    if(hashName === '?item_type=deleted_item'){
      YourWorkTab.style.borderBottom = "2px solid #ff3c41";
      YourWorkTab.lastElementChild.style.color = "#f1f1f3";
    }else{
      YourWorkTab.firstElementChild.style.color = "#f1f1f3";
    }
  }
  // your-work-features 功能列表
  if (YourWorkFeatures) {
    GridListStyle();
  }

  // 全站搜尋頁面
  if (searchUsersFeatures) {
    searchUsersFeatures.parentElement.style.maxWidth = '1280px'
  }
})
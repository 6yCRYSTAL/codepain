document.addEventListener('turbolinks:load',function(){
  const UserMenuBtn = document.querySelector('#userMenu-btn');
  const SideBtn = document.querySelector('.sidebar-toggle-btn button');
  const MainSidebar = document.querySelector('.main-sidebar');
  const Container = document.querySelector('.container-left');
  const DeleteTab = document.querySelector('#tab-delete');
  const OnClose = localStorage.getItem('onClose');


  // 登入頁-使用者選單
  if (UserMenuBtn) {
    UserMenuBtn.addEventListener('click',(e)=>{
      const UserMenuTopNav = e.currentTarget.nextElementSibling;
      UserMenuTopNav.classList.toggle('active');
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
    let hashName = window.location.search;
    const YourWorkTab = document.querySelector('.your-work-tab');
    const GridBtn = document.querySelector('.grid-btn button');
    const ListBtn = document.querySelector('.list-btn button');

    if(hashName === '?item_type=deleted_item'){
      YourWorkTab.style.borderBottom = "2px solid #ff3c41";
      YourWorkTab.lastElementChild.style.color = "#f1f1f3";
    }else{
      YourWorkTab.firstElementChild.style.color = "#f1f1f3";
    }
    if(hashName === '?grid_type=grid'){
      GridBtn.style.backgroundColor = "#717790";
      GridBtn.firstElementChild.style.fill = "#f1f1f3";
    }else{
      ListBtn.style.backgroundColor = "#717790";
      ListBtn.firstElementChild.style.fill = "#f1f1f3";
    }

  }

})
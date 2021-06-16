import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'burger', 'sidebar']

  connect() {
    // 外面點擊關掉
    const burger = this.burgerTarget;
    const sidebar = this.sidebarTarget;
    window.addEventListener('click', function(e){
      if (burger.contains(e.target)){
        sidebar.classList.toggle('menu-sidebar-active')
        burger.classList.toggle('burger-menu-open')
      } else{
        sidebar.classList.remove('menu-sidebar-active')
        burger.classList.remove('burger-menu-open')
      }
    });
  }
}
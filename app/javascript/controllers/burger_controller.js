import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ 'burger', 'sidebar']

  openSidebar() {
    this.sidebarTarget.classList.toggle('menu-sidebar-active')
    this.burgerTarget.classList.toggle('burger-menu-open')
  }
}
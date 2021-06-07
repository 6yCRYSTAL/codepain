import { Controller } from "stimulus"
export default class extends Controller {
  static targets = [ "copyBtn" ]
  copy() {
    let url = window.location.href;
    let aux = document.createElement("input");
    aux.setAttribute("value", url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.copyBtnTarget.innerHTML = `<i class="fas fa-link"></i> Copied`
    setTimeout(() => {
      this.copyBtnTarget.innerHTML = `<i class="fas fa-link"></i> Copy Link`
    }, 1000)
  }
}

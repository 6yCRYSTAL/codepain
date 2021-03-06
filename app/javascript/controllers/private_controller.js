import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
import Turbolinks from 'turbolinks'

function UnlockBtn(Checks) {
  Checks.forEach( UnlockBtn => {
    UnlockBtn.innerHTML=`
      <div class="lock-icon"><i class="fas fa-eye"></i></div>
      <span>Make Public</span>
      <span class="logo-pro" style="visibility:hidden;">pro</span>
    `
  });
}
function LockBtn(Checks) {
  Checks.forEach( LockBtn => {
    LockBtn.innerHTML=`
      <div class="lock-icon"><i class="fas fa-lock"></i></div>
      <span>Make Private</span>
      <span class="logo-pro">pro</span>
    `
  });
}
export default class extends Controller {
  static targets = [ 'privateIcons', 'privateChecks' ]
  static values = { random: String }
  // Private 按鈕傳送 api
  togglePrivate() {
    const icon = this.privateIconsTargets
    const check = this.privateChecksTargets
    let toArrayCheck = Array.from(check);

    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/private`,
      type: 'post',
      success: (data) => {
        check.checked = data.payload.boolean;
        if(check.checked){
          icon.forEach( Icon => {
            Icon.classList.remove("hidden");
            Icon.dataset.isPrivate = check.checked;
          });
          UnlockBtn(toArrayCheck);
        }else{
          icon.forEach( Icon => {
            Icon.classList.add("hidden");
            Icon.dataset.isPrivate = check.checked;
          });
          LockBtn(toArrayCheck);
        }
      },
      error: () => Turbolinks.visit('/accounts/pro', 'replace')
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  // Points 點擊判斷 Private 按鈕狀態
  togglePoints(){
    const icon = this.privateIconsTargets;
    const check = this.privateChecksTargets;
    let toArrayCheck = Array.from(check);
    let isPrivate = icon[0].dataset.isPrivate;

    if (isPrivate === 'true') {
      UnlockBtn(toArrayCheck);
    }else{
      LockBtn(toArrayCheck);
    }
  }

  // 更動判斷 Private 鎖頭狀態
  connect() {
    const icon = this.privateIconsTargets;
    if (icon.length === 2) {
      let isPrivate = icon[0].dataset.isPrivate;

      if (isPrivate === 'true') {
        icon.forEach( Icon => {
          Icon.classList.remove("hidden");
        });
      }else{
        icon.forEach( Icon => {
          Icon.classList.add("hidden");
        });
      }
    }
  }
}

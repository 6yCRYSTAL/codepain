import { Controller } from 'stimulus'
import Rails from '@rails/ujs'
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
  static values = {
    random: String,
  }
  // Private 按鈕傳送 api
  togglePrivate() {
    const icon = this.privateIconsTargets
    const check = this.privateChecksTargets
    let toArrayIcon = Array.from(icon);
    let toArrayCheck = Array.from(check);

    Rails.ajax({
      url: `/api/v1/pens/${this.randomValue}/private`,
      type: 'post',
      success: (data) => {
        check.checked = data.payload.boolean;
        if(check.checked === true){
          toArrayIcon.forEach( Icon => {
            Icon.classList.remove("hidden");
            Icon.dataset.isPrivate = check.checked;
          });
          UnlockBtn(toArrayCheck);
        }else{
          toArrayIcon.forEach( Icon => {
            Icon.classList.add("hidden");
            Icon.dataset.isPrivate = check.checked;
          });
          LockBtn(toArrayCheck);
        }
      }
    })
  }
  stopPropagation(e) {
    e.stopPropagation()
  }
  // Points 點擊判斷 Private 按鈕狀態
  togglePoints(){
    const icon = this.privateIconsTargets;
    const check = this.privateChecksTargets;
    let toArrayIcon = Array.from(icon);
    let toArrayCheck = Array.from(check);
    let isPrivate = toArrayIcon[0].attributes[2].nodeValue;
    let isPrivate2 = toArrayIcon[1].attributes[2].nodeValue;

    if ((isPrivate && isPrivate2) === 'true') {
      UnlockBtn(toArrayCheck);
    }
    if ((isPrivate && isPrivate2) === 'false') {
      LockBtn(toArrayCheck);
    }
  }

  // 第一次判斷 Private 鎖頭狀態
  initialize() {
    const icon = this.privateIconsTargets;
    let toArrayIcon = Array.from(icon);
    let isPrivate = toArrayIcon[0].attributes[2].nodeValue;
    let isPrivate2 = toArrayIcon[1].attributes[2].nodeValue;
    if ((isPrivate && isPrivate2) === 'true') {
      toArrayIcon.forEach( Icon => {
        Icon.classList.remove("hidden");
      });
    }
    if ((isPrivate && isPrivate2) === 'false'){
      toArrayIcon.forEach( Icon => {
        Icon.classList.add("hidden");
      });
    }
  }
}
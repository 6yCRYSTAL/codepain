const savedNotice = () => {
  let editHeader = document.querySelector('.edit-header');
  let noticeDivEl = document.createElement('div');
  let noticeTextEl = document.createElement('span');
  noticeDivEl.classList.add('edit-title-alert');
  noticeTextEl.textContent = 'Pen saved';
  noticeDivEl.appendChild(noticeTextEl)
  editHeader.insertAdjacentElement('beforebegin', noticeDivEl);
  setTimeout(() => {
    noticeDivEl.remove();
  }, 1000);
}

export default savedNotice
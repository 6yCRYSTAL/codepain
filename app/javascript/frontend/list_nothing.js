document.addEventListener('turbolinks:load',function(){
  const nothing = document.querySelector('.list-nothing');
  const clearSearch = document.querySelector('.list-clear-search');
  const searchPen = localStorage.getItem('searchPen');
  // searchPen 0=關掉 el ; 1=打開 el
  let isSearchPen = Number(searchPen);
  localStorage.setItem('searchPen','0');

  // 顯示區塊
  function noSearchPenEl(){
    nothing.firstElementChild.style.display = 'none';
    localStorage.setItem('searchPen','0');
  }
  function noPenEl(){
    nothing.lastElementChild.style.display = 'none';
  }
  if (nothing) {
    if(isSearchPen){
      noSearchPenEl();
    }else{
      noPenEl();
    }
  }
  if(clearSearch && nothing){
    clearSearch.addEventListener('click',()=> {
      noPenEl();
    })
  }
})
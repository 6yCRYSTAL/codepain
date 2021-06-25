// Grid List切換樣式
export default function GridListStyle() {
  const GridBtn = document.querySelector('.grid-btn button');
  const ListBtn = document.querySelector('.list-btn button');

  if (GridBtn || ListBtn) {
    if(location.href.includes('grid_type=list')){
      ListBtn.style.backgroundColor = "#717790";
      ListBtn.firstElementChild.style.fill = "#f1f1f3";
    }else{
      GridBtn.style.backgroundColor = "#717790";
      GridBtn.firstElementChild.style.fill = "#f1f1f3";
    }
  }

};
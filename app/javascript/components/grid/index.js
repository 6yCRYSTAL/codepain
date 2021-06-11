import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import GridItem from './GridWrap'
import FeaturesAlert from './FeaturesAlert'
import axios from 'axios'

document.addEventListener('turbolinks:load',function(){
  const PenItemsWrap = document.querySelector('.pens-grid');
  const FeaturesModal = document.querySelectorAll('.modal-entry');
  if (PenItemsWrap) {
    ReactDOM.render(
      <GridItem />,
      PenItemsWrap
    )
  }
  // const { setAlertToggle, setPrivateToggle, data, privateToggle ,cssList ,jsList } = props;
  if (FeaturesModal) {
    FeaturesModal.forEach((featureGrid) => {
      let randomUrl = featureGrid.id
      const [isAlert, setIsAlert] = useState(false)


      React.useEffect(() =>{
        const LikeId = []
        axios.get(`/api/v1/pens/grid/${clickPage}`,{
          params: {
          search_term: `${searchValue}`,
          sort_by: `${sortBy}`,
          sort_order: `${sortDirection}`}
        })
        .then(res =>{
          setGrid(res.data.payload.pens);
          setTotalPage(res.data.payload.meta.totalPages);
          setIsLoading(false);
          // 使用者喜歡哪些 pens 的 id
          if (res.data.payload.pens.length !== 0) {
            res.data.payload.pens[0].user.love_pens.forEach((like) => {
              LikeId.push(like.id);
            });
          }
          setUserLike(LikeId);
          // SearchNoData 判斷
          setSearchNoData(false);
          if(res.data.payload.pens.length === 0){
            setSearchNoData(true);
          }
        })
      })

      ReactDOM.render(
        <>
          <button>
            <i class="fas fa-expand-arrows-alt"></i>
          </button>
          <FeaturesAlert
            />
        </>
      )
  })}
})
import React from 'react'
import GridListBtn from './GridListBtn.js'
import SearchInput from './SearchInput.js'
import SortBy from './SortBy.js'
import SortDirection from './SortDirection.js'

// 功能列表
const WorkFeatures = ({setAllValue})=>{
  const [isSearchValue, setSearchValue] = React.useState([]);
  const [isSortBy, setSortBy] = React.useState('Date Created');
  const [isSortOrder, setSortOrder] = React.useState('desc');

  React.useEffect(() =>{
    setAllValue([`${isSearchValue}`,`${isSortBy}`,`${isSortOrder}`])
  },[isSearchValue,isSortBy,isSortOrder]);
  return(
    <div className="your-work-features">
      <div className="features-item">
        <SearchInput
        setSearchValue = {setSearchValue}
        />
      </div>
      <nav className="features-item">
        <GridListBtn />
        <SortBy
          setSortBy = {setSortBy}
          isSortBy = {isSortBy}
        />
        <SortDirection
          setSortOrder = {setSortOrder}
        />
      </nav>
    </div>
  );
};
export default WorkFeatures

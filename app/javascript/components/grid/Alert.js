import React from 'react'
import Points from './Points.js'

// 彈跳視窗功能
const Alert = (props) => {
  const { setAlertToggle,setPrivateToggle,data,privateToggle } = props;
  const { title,user_name,random_url,heart_count,comments_count,view_count,html,js,css,isPrivate} = data;

  // 關掉彈跳視窗
  function closeAlert(e){
    if (e.target === e.currentTarget) {
      setAlertToggle(false);
      document.querySelector('body').classList.remove('fixed');
      // 修改網址
      // history.replaceState(null, 'your-work', `${location.origin}/your-work?grid_type=grid`);
    };
  };
  // 新增網址，而不會刷新頁面
  // React.useEffect(() =>{
  //   history.pushState({user_name, random_url}, `Selected: ${user_name}, ${random_url}`, `./${user_name}/details/${random_url}`);
  // })
  return(
    <div
      id="modal"
      className="modal-container"
      onClick={ closeAlert }>

      <div className="modal-content">
        <header className="modal-header">
          <p>{ user_name }</p>
          {
            privateToggle &&
            <div className="private-lock alert-private-lock" id="private-lock">
              <i className="fas fa-lock text-gray-400"></i>
            </div>
          }

          {/* 鎖頭入口 */}
          <div className="points-content-wrap points-content-bottom">
            <Points
              url={ random_url }
              setPrivateToggle={setPrivateToggle}
            />
          </div>
        </header>

        <div className="bg-gray-300" data-controller="comcreate">
          <section>
            <textarea className="w-6/12 h-20"
            placeholder="Want to know how <%=pen.user.username%> did this? Ask a question!
            Feeling inspired? Let <%=pen.user.username%> know!
            Want to share how you used this Pen?
            Give the creator a confidence boost!"
            data-comcreate-target="createTextArea" />
            <span
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded "
            data-action="click->comcreate#create"
            data-comcreate-target="createBtn"
            > Comment
            </span>
          </section>
          <div>
            <div id="view_count"><i className="fas fa-eye" />{ view_count }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert
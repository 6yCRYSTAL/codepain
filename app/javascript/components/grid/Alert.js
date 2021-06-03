import React from 'react'
import { comment } from 'postcss';

// 彈跳視窗功能
export default function Alert(props) {
  const { setToggle } = props;
  // const { title,user_name,random_url,heart_count,comments_count,view_count,html,js,css} = props.data;



  // 關掉彈跳視窗
  function closeAlert(e){
    if (e.target === e.currentTarget) {
      setToggle(false);
      document.querySelector('body').classList.remove('fixed');
      // 修改網址
      history.replaceState(null, 'your-work', `${location.origin}/your-work?grid_type=grid`);
    };
  };
  // 新增網址，而不會刷新頁面
  React.useEffect(() =>{
    // history.pushState({user_name, random_url}, `Selected: ${user_name}, ${random_url}`, `./${user_name}/details/${random_url}`);
  })

  return(

    <div id="modal" className="modal-container" onClick={ closeAlert }>
      <div className="modal-content">
        <a href="#" id="username"> {user_name} </a>
        <div className="points-wrap points-content-bottom" data-url={`${random_url}`}></div>
        <div className="bg-gray-300" data-controller="comment-create">
          <section>
            <textarea className="w-6/12 h-20"
                      placeholder={`Want to know how ${user_name} did this? Ask a question!\nFeeling inspired? Let ${user_name} know!\nWant to share how you used this Pen?\nGive the creator a confidence boost!`}
                      data-comment-create-target="createTextArea"></textarea>
            <span className="bg-gray-500 text-white font-bold py-2 px-4 rounded "
                  data-action="click->comment-create#create"
                  data-comment-create-target="createBtn">
              Comment
            </span>
          </section>
          <section>
            <p className="uppercase" data-comments-count={comments_count} data-comment-create-target="commentsCount">
              {comments_count} comments</p>
            <ol data-comment-create-target="list" id="comment-list">
              {/* each do */}
              <li data-controller="comment-update comment-delete"
                  data-comment-update-target="commentLi"
                  data-comment-delete-target="commentLi"
                  data-comment-delete-id-value="??????????">
                <div>
                  <span>{user_name} (@{user_name})</span>
                  <span>???????????</span>
                </div>
                <div className="comment-update-block" data-comment-update-target="commentBlock">
                  <textarea data-comment-update-target="updateTextArea">??????????</textarea>
                  <button data-action="click->comment-update#update" data-comment-update-target="updateBtn" data-id="??????????"> Update </button>
                  <button data-action="click->comment-update#cancel" data-comment-update-target="cancelBtn"> Cancel </button>
                </div>
                <div>
                  <p data-comment-update-target="commentShow">??????????</p>
                </div>
              <button data-action="click->comment-update#edit" data-comment-update-target="editBtn"> Edit </button>
              <button data-action="click->comment-delete#delete" data-comment-update-target="deleteBtn"> Delete</button>
              </li>
            </ol>
          </section>
        </div>
        <div>
          <div id="view_count"><i className="fas fa-eye" /> {view_count} Views</div>
        </div>
      </div>
    </div>
  );
};


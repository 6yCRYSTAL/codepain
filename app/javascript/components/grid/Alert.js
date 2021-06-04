import React, { useEffect, useState } from 'react'
import Rails from '@rails/ujs'

// 彈跳視窗功能
const Alert = (props) => {
  const { setToggle } = props;
  const { user_name,random_url,comments_count,view_count } = props.data;

  const [ comments, setComments ] = useState([])

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
    history.pushState({user_name, random_url}, `Selected: ${user_name}, ${random_url}`, `./${user_name}/details/${random_url}`);
  },[])

  useEffect( () => {
    Rails.ajax({
      type: 'get',
      url: '/api/v1/comments',
      data: `random_url=${random_url}`,
      success: (response) => {
        let commentData = response.comments
        setComments(commentData)
      }
    })
  }, [])

  return(
    <div id="modal" className="modal-container" onClick={ closeAlert }>
      <div className="modal-content">
        <a href="#" id="username">{ user_name }</a>
        <div className="points-wrap points-content-bottom" data-url={ random_url }></div>
        <div className="bg-gray-300"
             data-controller="comment-create"
             data-comment-create-url-value={ random_url }>
          <section>
            <textarea className="w-6/12 h-20"
                      placeholder={`Want to know how ${user_name} did this? Ask a question!\nFeeling inspired? Let ${user_name} know!\nWant to share how you used this Pen?\nGive the creator a confidence boost!`}
                      data-comment-create-target="createTextArea"></textarea>
            <span className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  data-action="click->comment-create#create"
                  data-comment-create-target="createBtn">
              Comment
            </span>
          </section>
          <section>
            <p className="uppercase" data-comment-create-target="commentsCount"> { comments_count } comments</p>
            <ol data-comment-create-target="list" id={random_url}>
            {
              comments.map( (commentData) => {
                return(
                  <li data-controller="comment-update comment-delete"
                      data-comment-update-target="commentLi"
                      data-comment-delete-target="commentLi"
                      data-comment-delete-id-value={ commentData.content.id }
                      key={ commentData.content.id }>
                    <div>
                      <span>{ commentData.user.display_name } (@{ commentData.user.username })</span>
                      <span>{ commentData.created_at }</span>
                    </div>
                    <div className="comment-update-block" data-comment-update-target="commentBlock">
                      <textarea data-comment-update-target="updateTextArea" defaultValue={ commentData.content.content }></textarea>
                      <button data-action="click->comment-update#update" data-comment-update-target="updateBtn" data-id={ commentData.content.id }> Update </button>
                      <button data-action="click->comment-update#cancel" data-comment-update-target="cancelBtn"> Cancel </button>
                    </div>
                    <div>
                      <p data-comment-update-target="commentShow">{ commentData.content.content }</p>
                    </div>
                    <button data-action="click->comment-update#edit" data-comment-update-target="editBtn"> Edit </button>
                    <button data-action="click->comment-delete#delete" data-comment-update-target="deleteBtn"> Delete</button>
                  </li>
                )
              })
            }
            </ol>
          </section>
        </div>
        <div>
          <div id="view_count"><i className="fas fa-eye" /> { view_count } Views</div>
        </div>
      </div>
    </div>
  );
};

export default Alert
import React, { useEffect, useState } from 'react'
import Rails from '@rails/ujs'
import Points from './Points.js'

// 彈跳視窗功能
const Alert = (props) => {
  const { setAlertToggle,setPrivateToggle,data,privateToggle } = props;
  const { title,user_name,random_url,comments_count,view_count} = data;

  const [ comments, setComments ] = useState([])
  const [ res, setRes] = useState([])
  const [ judgeCurrentUser, setJudgeCurrentUser] = useState(false)

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
  useEffect(() =>{
    // history.pushState({user_name, random_url}, `Selected: ${user_name}, ${random_url}`, `./${user_name}/pen/${random_url}`);
  },[])

  useEffect( () => {
    Rails.ajax({
      type: 'get',
      url: '/api/v1/comments',
      data: `random_url=${random_url}`,
      success: (response) => {
        let commentData = response.comments
        setComments(commentData)
        setRes(response)
        //TODO
        console.log(response)
        console.log(response.current_user.id)
      }
    })
  }, [])

    //TODO

    if (res.current_user.id === commentData.user.id){
      setJudgeCurrentUser(true)
      return(
        <div className="edit-btn-block">
          <button className="comment-edit-btn" data-action="click->comment-update#edit" data-comment-update-target="editBtn">
            <span><i className="fas fa-pencil-alt"></i></span>
            <span>Edit</span>
          </button>
          <button className="comment-delete-btn" data-action="click->comment-delete#delete" data-comment-update-target="deleteBtn">
            <span><i className="fas fa-trash"></i></span>
            <span>Delete</span>
          </button>
        </div>
      )
    }


  return(
    <div
      id="modal"
      className="modal-container"
      onClick={ closeAlert }>

      <div className="modal-content">
        <header className="modal-header">
          <p>{ user_name } { title }</p>
          {
            privateToggle &&
            <div className="private-lock alert-private-lock" id="private-lock">
              <i className="fas fa-lock text-gray-400"></i>
            </div>
          }

          {/* 鎖頭入口 */}
          <div className="points-wrap points-content-bottom"
               data-url={`${random_url}`}
               data-controller="delete-pen"
               data-delete-pen-username-value={`${user_name}`}
               data-delete-pen-random-value={`${random_url}`}
               data-delete-pen-target="trashedPen">
            <Points
              url={ random_url }
              setPrivateToggle={ setPrivateToggle }
              privateToggle= { privateToggle }
            />
          </div>
        </header>
        <div className="comment-wrap"
             data-controller="comment-create"
             data-comment-create-url-value={ random_url }>
          <section>

            <textarea className="w-6/12 h-20"
                      placeholder={`Want to know how ${user_name} did this? Ask a question!\nFeeling inspired? Let ${user_name} know!\nWant to share how you used this Pen?\nGive the creator a confidence boost!`}
                      data-comment-create-target="createTextArea"></textarea>
            <div className="comment-submit-block">
              <span className="comment-submit-btn"
                    data-action="click->comment-create#create"
                    data-comment-create-target="createBtn">Comment</span>
            </div>
            <p className="comments-count" data-comment-create-target="commentsCount"> { comments_count } comments</p>
            <ol data-comment-create-target="list" id={random_url}>
            {
              comments.map( (commentData) => {
                return(
                  <li data-controller="comment-update comment-delete"
                      data-comment-update-target="commentLi"
                      data-comment-delete-target="commentLi"
                      data-comment-delete-id-value={ commentData.content.id }
                      key={ commentData.content.id }>
                    <div className = "comment-user-info">
                      <div className="user-comment-img">
                        <img src="/images/user-img.jpg" alt="使用者圖像" />
                      </div>
                      <div className="user-name">
                        <span>{ commentData.user.display_name }</span>
                        <span className="light-text"> @{ commentData.user.username } </span>
                      </div>
                      <div className="comment-time"> { commentData.created_at } ago </div>
                    </div>
                    <div className="comment-update-block" data-comment-update-target="commentBlock">
                      <textarea data-comment-update-target="updateTextArea" defaultValue={ commentData.content.content }></textarea>
                      <div className="update-btn-block">
                        <button data-action="click->comment-update#cancel" data-comment-update-target="cancelBtn"> Cancel </button>
                        <button data-action="click->comment-update#update" data-comment-update-target="updateBtn" data-id={ commentData.content.id }> Update </button>
                      </div>
                    </div>
                    <div className="comment-content-block">
                      <div className="comment-content-text">
                        <p data-comment-update-target="commentShow">{ commentData.content.content }</p>
                      </div>
                      {
                        judgeCurrentUser &&
                          <div className="edit-btn-block">
                          <button className="comment-edit-btn" data-action="click->comment-update#edit" data-comment-update-target="editBtn">
                            <span><i className="fas fa-pencil-alt"></i></span>
                            <span>Edit</span>
                          </button>
                          <button className="comment-delete-btn" data-action="click->comment-delete#delete" data-comment-update-target="deleteBtn">
                            <span><i className="fas fa-trash"></i></span>
                            <span>Delete</span>
                          </button>
                        </div>
                      }
                    </div>
                  </li>

                )
              })
            }
            </ol>
          </section>
          <aside>
            <div className="share-block">
            <span className="share-text">Share</span>
            <button className="copy-link"
                    data-controller="share-link"
                    data-share-link-target="copyBtn"
                    data-action="click->share-link#copy">
              <i className="fas fa-link"></i> Copy Link</button>
            </div>
            <dl>
              <div>
                <dt>Created on</dt>
                <dd>{res.pen_created_on}</dd>
              </div>
            <div>
              <dt>Updated on</dt>
              <dd>{res.pen_updated_on}</dd>
            </div>
            </dl>
            <div id="view_count"><i className="fas fa-eye" /> { view_count } Views</div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Alert
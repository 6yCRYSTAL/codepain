import React from 'react'

export default function Alert(props) {
  const { setToggle, AtToggle } = props
  const { title,user_name,random_url,heart_count,comments_count,view_count,html,js,css} = props.data
  function closeAlert(e){
    if (e.target === e.currentTarget) {
      setToggle(false)
      document.querySelector('body').classList.remove('fixe')
    }
  }


  return(
    <div id="modal" className="modal-container" onClick={ closeAlert }>
      <div className="modal-content">
        <a href="#" id="username">
          <h1>{user_name}</h1>
        </a>
          <p>{title}</p>
          <p>{html}</p>
          <p>{css}</p>
          <p>{js}</p>
          <div className="bg-gray-300" data-controller="comcreate">
          <section >
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
            <div id="view_count"><i className="fas fa-eye"></i>{view_count}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


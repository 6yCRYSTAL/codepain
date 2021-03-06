import React from 'react'
import getLike from '../../frontend/get_like.js'
import Points from './Points.js'
import Alert from './Alert.js'

// 每個 pen
const PenItemContent = (props) => {
  const {html,js,css,title,user_name,random_url,heart_count,comments_count,view_count,id,userLike,isPrivate,cssList,jsList} = props;
  const [privateToggle, setPrivateToggle] = React.useState(false);
  const [alertToggle, setAlertToggle] = React.useState(false);
  const [getData, setData] = React.useState({});
  const data = {title,user_name,random_url,heart_count,comments_count,view_count,html,js,css,isPrivate,cssList,jsList};

  // 判斷自己 id & 所有喜歡的pen ; 沒有 -1 有陣列數
  let haveUserLike = userLike.indexOf(id);
  let isReact = false

  // 開啟彈跳視窗
  function atAlert() {
    setAlertToggle(true);
    setData(data);
    document.querySelector('body').classList.add('fixed');
  };

  // 整理 cssCDN 清單
  function cssCDN () {
    if (cssList) {
      let cssCdnPrepared = cssList.map(({url}) => `<link rel="stylesheet" href="${url}"></link>`)
      return cssCdnPrepared.join('')
    } else {return ""}
  }

  // 整理 jsCDN 清單
  function jsCDN () {
    if (jsList) {
      let jsCdnPrepared = jsList.map(({url}) => `<script src="${url}"></script>`)
      if (jsCdnPrepared.join('').includes('react')) {
        isReact = true
        jsCdnPrepared += '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>'
      } else {isReact = false}
      return jsCdnPrepared
    } else {return ""}
  }

  function babelSwitch () {
    return isReact ? 'babel' : 'javascript'
  }

  React.useEffect(() =>{
    // 一開始判斷私有鎖
      setPrivateToggle(isPrivate)
  },[])

  return(
    <>
      <div className="pen-item">
        <header className="pen-header">
          <a href={`${user_name}/pen/${random_url}`}>{title}</a>
          <div className="points-wrap points-content-top points-wrap-grid"
               data-url={`${random_url}`}
               data-controller="delete-pen"
               data-delete-pen-username-value={`${user_name}`}
               data-delete-pen-random-value={`${random_url}`}
               data-delete-pen-target="trashedPen">
            <Points
              url={ random_url }
              setPrivateToggle= { setPrivateToggle }
              privateToggle= { privateToggle }
            />
          </div>
        </header>
        <div className="pen-img">
          <iframe id="grid-iframe"
                  className="iframe-grid"
                  sandbox="allow-scripts"
                  loading="lazy"
                  scrolling="no"
                  frameBorder="0"
                  srcDoc={`
                    <html>
                      ${cssCDN()}
                      <style>${css}</style>
                      <body>
                        ${html}
                        ${jsCDN()}
                        <script type="text/${babelSwitch()}">${js}</script>
                      </body>
                    </html>`}>
          </iframe>
          <a className="cover-link" href={`${user_name}/pen/${random_url}`} />

          <div className="prompt-link">
            <button id="modal-btn" className="modal-btn" onClick={ atAlert }><i className="fas fa-expand-arrows-alt" /></button>
          </div>

          {/* 開鎖 icon */}
          {
            privateToggle &&
            <div className="private-lock grid-private-lock" id="private-lock">
              <i className="fas fa-lock"></i>
            </div>
          }
        </div>

        <footer className="pen-footer">
          <a className="pen-footer-style" data-btn="love" data-url={random_url} onClick={ getLike }>
            <i
              className="fas fa-heart"
              style={{
                color: haveUserLike.toString() === '-1'? "white" : "red"
              }}
            />
            <span className="heart-count">{heart_count}</span>
          </a>
          <a className={`pen-footer-style comment-create-${random_url}`} data-btn="comments" onClick={ atAlert }>
            <i className="fas fa-comment" />
            <span>{comments_count}</span>
          </a>
          <a href="#" className="pen-footer-style" data-btn="views">
            <i className="fas fa-eye" />
            <span>{view_count}</span>
          </a>
        </footer>
      </div>
      {
        alertToggle &&
        <Alert
          data={ getData }
          setAlertToggle={ setAlertToggle }
          setPrivateToggle={ setPrivateToggle }
          privateToggle={ privateToggle }
          cssList={cssList}
          jsList={jsList}
        />
      }
    </>
  );
};

export default PenItemContent

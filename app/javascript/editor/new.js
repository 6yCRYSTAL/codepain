import "ace-builds/src-noconflict/ace.js"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/ext-error_marker"

document.addEventListener('turbolinks:load', () => {
  // set Ace
  let editorHTML = ace.edit("editor--html")
  let editorCSS = ace.edit("editor--css")
  let editorJS = ace.edit("editor--js")

  function init() {
    // set options
    editorHTML.setOptions({
      mode: "ace/mode/html",
      theme: "ace/theme/twilight",
      highlightActiveLine: true,
      fontFamily: 'monospace',
      fontSize: '12pt',
      tabSize: '2',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })  
    editorCSS.setOptions({
      mode: "ace/mode/css",
      theme: "ace/theme/twilight",
      highlightActiveLine: true,
      fontFamily: 'monospace',
      fontSize: '12pt',
      tabSize: '2',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })
    editorJS.setOptions({
      mode: "ace/mode/javascript",
      theme: "ace/theme/twilight",
      highlightActiveLine: true,
      fontFamily: 'monospace',
      fontSize: '12pt',
      tabSize: '2',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })
    editorHTML.getSession().on('change',function(){
      renderToiframe()
    })
    editorCSS.getSession().on('change',function(){
      renderToiframe()
    })
    editorJS.getSession().on('change',function(){
      renderToiframe()
    })
  }

  // render to iframe
  function renderToiframe() {
    let result = document.querySelector('#edit--result').contentDocument
    result.open()
    result.write(`${editorHTML.session.getValue()}`)
    result.write(`<style>${editorCSS.session.getValue()}</style>`)
    result.write(`<script>${editorJS.session.getValue()}</script>`)
    result.close()
  }
  
  // show console
  const consolecontainer = document.querySelector('.edit-console-container')
  const consoleResult = document.querySelector('.edit-console')
  const consoleBtn = document.querySelector('#console-btn')
  const clearConsoleBtn = document.querySelector('.edit-console-clear')
  const closeConsoleBtn = document.querySelector('.edit-console-close')

  consoleBtn.addEventListener('click', () => {
    consolecontainer.classList.toggle('on')
    consoleMsg()
    clearConsole()
  })

  // get console msg
  function consoleMsg() {
    // 先把原本的console 備份起來
    let oldConsole = console

    editorJS.getSession().on('change', ()=>{
      let stdoutMsg = ""
      // 改寫 console
      window.console = {
        log: function(msg) {
          stdoutMsg += `${msg}\n`
        }
      }
  
      try{
        eval(editorJS.session.getValue())
        consoleResult.innerText = stdoutMsg
      } catch (e) {
        let msg = `${e.name}: ${e.message}`
        consoleResult.innerText = msg
      }
      // 恢復原本的 console.log
      window.console = oldConsole
    })
  }
  // clear console
  function clearConsole() {
    clearConsoleBtn.addEventListener('click', () => {
      consoleResult.innerText = ""
    })
  }

  // close console
  function closeConsole() {
    closeConsoleBtn.addEventListener('click', () => {
      consolecontainer.classList.toggle('on')
    })
  }
 
  // share btn get url
  function shareURL() {
    const shareBtn = document.querySelector('#edit-share-btn')

    shareBtn.addEventListener('click', () => {
      const shareBox = document.createElement('div')
      shareBox.setAttribute('class', 'share-box')
      shareBox.textContent = "Share The URL"

      const editContainer = document.querySelector('.edit-zone-container:last-child')
      editContainer.appendChild(shareBox)

      const shareBtnInput = document.createElement('input')
      shareBtnInput.setAttribute('class', 'share-btn-input')
      shareBox.appendChild(shareBtnInput)
      shareBtnInput.value = window.location.href

      const shareBtnCopy = document.createElement('div')
      shareBtnCopy.setAttribute('class', 'share-btn-copy')
      shareBox.appendChild(shareBtnCopy)
      shareBtnCopy.textContent = "Copy Link"

      const closeBox = document.createElement('span')
      closeBox.setAttribute('class', 'share-box-close')
      closeBox.textContent = "x"
      shareBox.appendChild(closeBox)
      
      closeBox.addEventListener('click', () => {
        shareBox.remove()
      })

      shareBtnCopy.addEventListener('click', ()=> {
        shareBtnInput.select()
        document.execCommand('copy')
        
      })
    })
  }

  init()
  renderToiframe()
  closeConsole()
  shareURL()
})
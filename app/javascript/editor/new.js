import "ace-builds/src-noconflict/ace.js"
import "ace-builds/webpack-resolver.js"
import "ace-builds/src-noconflict/ext-language_tools.js"
import "ace-builds/src-noconflict/mode-html.js"
import "ace-builds/src-noconflict/mode-css.js"
import "ace-builds/src-noconflict/mode-javascript.js"
import "emmet-core/emmet.js"
import "ace-builds/src-noconflict/ext-emmet.js"
import "ace-builds/src-noconflict/theme-twilight.js"
import "ace-builds/src-noconflict/ext-error_marker.js"
import "ace-builds/src-noconflict/snippets/javascript.js"

document.addEventListener('turbolinks:load', () => {
  const html = document.querySelector('#editor--html')
  const css = document.querySelector('#editor--css')
  const js = document.querySelector('#editor--js')

  if(html && css && js){
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
        enableEmmet: true,
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
        enableEmmet: true,
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
      editorHTML.getSession().on('change',() => {
        renderToiframe()
      })
      editorCSS.getSession().on('change',() => {
        renderToiframe()
      })
      editorJS.getSession().on('change',() => {
        renderToiframe()
      })
    }
  
    // render to iframe
    function renderToiframe() {
      let result = document.querySelector('#edit--result').contentWindow.document
      result.open()
      result.write(`${editorHTML.getValue()}`)
      result.write(`<style>${editorCSS.getValue()}</style>`)
      result.write(`<script>${editorJS.getValue()}</script>`)
      result.close()
    }
  
    // show console
    const consolecontainer = document.querySelector('.edit-console-container')
    const consoleResult = document.querySelector('.edit-console')
    const consoleBtn = document.querySelector('#console-btn')
    const clearConsoleBtn = document.querySelector('.edit-console-clear')
    const closeConsoleBtn = document.querySelector('.edit-console-close')
    const resultContainer = document.querySelector('.edit-result-container')
    
    consoleBtn.addEventListener('click', () => {
      consolecontainer.classList.toggle('on')
      resultContainer.classList.toggle('on')
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
        resultContainer.classList.toggle('on')
      })
    }
   
    // share btn get url
    function shareURL() {
      const shareBtn = document.querySelector('#edit-share-btn')
  
      shareBtn.addEventListener('click', () => {
        const shareBox = document.createElement('div')
        shareBox.setAttribute('class', 'share-box')
        shareBox.textContent = "Share The URL"
  
        const editContainer = document.querySelector('.iframe-console-container')
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
  }
})
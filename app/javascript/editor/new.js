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

  //TODO postMessage
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
  const consoleWrapper = document.querySelector('.edit-console-wrapper')
  const consoleResult = document.querySelector('.edit-console')
  const consoleBtn = document.querySelector('#console-btn')
  const clearConsoleBtn = document.querySelector('.edit-console-clear')
  const closeConsoleBtn = document.querySelector('.edit-console-close')

  consoleBtn.addEventListener('click', () => {
    consoleWrapper.classList.toggle('on')
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
      consoleWrapper.classList.toggle('on')
    })
  }
 
  // share btn get web url
  document.querySelector('#edit-share-btn').addEventListener('click', () => {
    alert(location.href)
  })

  init()
  renderToiframe()
  closeConsole()
})
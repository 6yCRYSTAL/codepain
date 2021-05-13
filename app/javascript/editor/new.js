import "ace-builds/src-noconflict/ace.js"
import "ace-builds/webpack-resolver"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/ext-error_marker"

document.addEventListener('DOMContentLoaded', () => {
  //set Ace
  ace.require("ace/ext/language_tools");
  let editorHTML = ace.edit("editor--html")
  let editorCSS = ace.edit("editor--css")
  let editorJS = ace.edit("editor--js")

  let editor = {
    init() {
      //set options
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
        update()
      })
      editorCSS.getSession().on('change',function(){
        update()
      })
      editorJS.getSession().on('change',function(){
        update()
      })
    }
  }
  //event
  //get console 
  // function getSessionValue(){
  //   editorHTML.session.on('change',function(){
  //     try{
  //       editorHTML.session.getValue()
  //       // console.log(editorHTML.session.getValue())
  //     }catch(err){
  //       console.error(err)
  //     }
  //   })
  //   editorCSS.session.on('change',function(){
  //     try{
  //       editorCSS.session.getValue()
  //       // console.log(editorCSS.session.getValue())
  //     }catch(err){
  //       console.error(err)
  //     }
  //   })
  //   editorJS.session.on('change',function(){
  //     try{
  //       editorJS.session.getValue()
  //       // console.log(editorJS.session.getValue())
  //     }catch(err){
  //       console.error(err)
  //     }
  //   })
  // }
  //render to iframe


  function update(){
    // let result = document.querySelector('#edit--result')
    let result = document.querySelector('#edit--result').contentDocument
    result.open()
    result.write(`${editorHTML.getValue()}`)
    result.write(`<style>${editorCSS.getValue()}</style>`)
    result.write(`<script>${editorJS.getValue()}</script>`)
    result.close()
  }


  editor.init()
  // getSessionValue()
  update()



})


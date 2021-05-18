import { Controller } from "stimulus"
import Rails from '@rails/ujs'

 
export default class extends Controller {

  connect() {
    console.log("Hello, Stimulus!", this.element)
  }


  static targets = [ "edit-btn", "cancel-btn" ]

  // initialize() {
  //   // TODO
  //   window.originElement = this.element.parentElement    
  // }

  update() {
    let element = this.element
    let commentSection = element.parentElement
    let commentContent = this.element.previousElementSibling.innerHTML
    let refNode = this.element.nextElementSibling
    let commentId = this.data.get('id')
    let newDiv = document.createElement("div")

    newDiv.innerHTML = `
    <div data-controller="comment" >
    
      <textarea> ${commentContent}</textarea>
      <span> Update </span>
      <sapn 
      data-action="click->comment#cancel"
      data-comment-target="cancel-btn"
      > Cancel </sapn>
    </div>
    `    
    commentSection.insertBefore(newDiv, refNode)
    element.previousElementSibling.remove()
    element.remove()
  }

  cancel() {
    let element = this.element
    let commentContent = element.querySelector("textarea").innerHTML
    let commentId = this.data.get('id')
    

    console.log(element)
    console.log(commentContent)
    console.log(commentId)
    element.parentElement.innerHTML = `
      <div
        data-controller="comment"
        data-action="click->comment#update"
        data-comment-target="edit-btn"
        data-comment-id="${commentId}" >
        Edit
      </div>
        
    `


    // element.innerHTML = 
    
    // element.remove()
    
    // element.innerHTML = `
    //   <div
    //   data-controller="comment"
    //   data-action="click->comment#update"
    //   data-comment-target="edit-btn"
    //   data-comment-id="${commentId}" >
    //     Edit
    //   </div>
    // `    
  }

}
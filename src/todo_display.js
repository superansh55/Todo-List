import { createTodo } from "./create_todo";



const newTaskBtn= document.querySelector(".addTask");
const taskDialog= document.querySelector("#my-dialog");

export function showDialog(){

newTaskBtn.addEventListener("click",()=>{
  taskDialog.showModal();
})

}
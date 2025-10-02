import { createTodo } from "./create_todo";
export function domDisplay(){
let defaultProject=[];
let projectsArray=[];
const taskDialog= document.querySelector("#my-dialog");
const taskDiv= document.querySelector(".item_list");
const projDispDiv=document.querySelector(".projDispDiv");
const projDialog=document.querySelector(".projectDialog");
 function displayProject(projName){
   projDispDiv.innerHTML = "";
    projectsArray.forEach((item) => {
      
      const projectTitle = document.createElement("h2");
      // projectTitle.setAttribute("data-id", item.getId());
      projectTitle.innerText=projName;
       projectTitle.setAttribute("data-id", item[0]);
    
      projDispDiv.appendChild(projectTitle);
})
}

function createProject(){
const createProjectBtn= document.querySelector(".createProjectBtn");
const projectName= document.querySelector("#projectName");
createProjectBtn.addEventListener("click",(event)=>{
  event.preventDefault();
    let newArray= [];
    let arrayToken=crypto.randomUUID();
    newArray[0]=arrayToken;
    newArray[1]=projectName.value;
    projectsArray.push(newArray);
    displayProject(projectName.value);
    console.log(projectsArray);
    projDialog.close(); 

})
  

}

function showProjectDialog(){
  const newProjectBtn= document.querySelector(".newProjectBtn");
  newProjectBtn.addEventListener("click",()=>{
    projDialog.showModal();
  })
}

 function displayTask(){
   taskDiv.innerHTML = "";
    defaultProject.forEach((item) => {
      const div = document.createElement("div");
      const taskTitle = document.createElement("h2");
      const taskDate = document.createElement("span");
      div.setAttribute("data-id", item.getId());
      taskTitle.innerText=item.getTitle();
      taskDate.innerText=item.getDate();

      div.appendChild(taskTitle);
      div.appendChild(taskDate);
      taskDiv.appendChild(div);
})
}

function populateProjectDropDown(){
  const projDropDown= document.querySelector("#projectInput");
  projDropDown.innerHTML="";
  projDropDown.addEventListener("click",()=>{
    projectsArray.forEach(item=>{
   const option = document.createElement('option');
         option.textContent = item[1];
           option.value = item[1];
    
   
    projDropDown.appendChild(option);
    })
  
  })
}

function createTask(){
    
    const titleInput= document.querySelector("#titleInput");
    const descriptionInput= document.querySelector("#descriptionInput");
    const priorityInput= document.querySelector("#priorityInput");
    const dateInput= document.querySelector("#dateInput");
    const noteInput= document.querySelector("#noteInput");
    const createTaskBtn=document.querySelector("#createTask");
    const projInput= document.querySelector("#projectInput");
    createTaskBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        const newTask= createTodo(titleInput.value,descriptionInput.value,priorityInput.value,dateInput.value,noteInput.value,projInput.value);
        newTask.updateTitle();
        newTask.updateDescription();
        newTask.updatePriority();
        newTask.updateDate();
        newTask.updateNote();
        newTask.updateId();
        newTask.updateProject();
        projectsArray.forEach(item=>{
          if(item[1]===newTask.getProjectName()){
                item.push(newTask);
          }
        })
        displayTask();
        taskDialog.close();

        
    })
}



function showDialog(){
const newTaskBtn= document.querySelector(".addTask");

newTaskBtn.addEventListener("click",()=>{
  taskDialog.showModal();
   populateProjectDropDown();
})


}

showDialog();
createTask();
createProject();
showProjectDialog();


}
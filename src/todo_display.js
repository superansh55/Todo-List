
import { createTodo } from "./create_todo";
export function domDisplay() {
  const taskDialog = document.querySelector("#my-dialog");
  const editDialog = document.querySelector('#edit-dialog');
  const taskDiv = document.querySelector(".item_list");
  const taskItem = document.querySelector('.taskItem');
  const projDispDiv = document.querySelector(".projDispDiv");
  const projDialog = document.querySelector(".projectDialog");
   const editTitleInput = document.querySelector('#editTitleInput');
  const editDescriptionInput = document.querySelector('#editDescriptionInput');
  const editPriorityInput = document.querySelector('#priorityInput');
  const editDateInput = document.querySelector('#editDateInput');
  const editNoteInput = document.querySelector('#editNoteInput');
  const editProjectInput = document.querySelector('#editProjectInput');
  const editTaskBtn = document.querySelector('#editTask');
  let defaultProject = [];
  let projectsArray = [];
  defaultProject[0] = crypto.randomUUID();
  defaultProject[1] = "default";
  projectsArray[0] = defaultProject;
  displayProject();
  displayTask(defaultProject);

  function displayProject() {
    projDispDiv.innerHTML = "";
    projectsArray.forEach((item) => {
      const projectTitle = document.createElement("h2");
      const deleteBtn= document.createElement("button");
       deleteBtn.setAttribute("data-id", item[0]);
       deleteBtn.innerText="Delete";
        deleteBtn.classList.add("deleteProj");
      projectTitle.setAttribute("data-id", item[0]);
      projectTitle.innerText = item[1];
      projectTitle.classList.add("proj");

      projDispDiv.appendChild(projectTitle);
      projDispDiv.appendChild(deleteBtn);
    });
    showProjContent();
    deleteProject();
  }

  function saveUpdate(task){
    editTaskBtn.addEventListener('click', function(event) {
    event.preventDefault();
    task.updateTitle(editTitleInput.value);
    task.updateDescription(editDescriptionInput.value);
    task.updatePriority(editPriorityInput.value);
    task.updateDate(editDateInput.value);
    task.updateNote(editNoteInput.value);
    task.updateProject(editProjectInput.value);
    editDialog.close();
  });
}

  function updateTask(item){
   
  editTitleInput.value = item.getTitle();
  editDescriptionInput.value = item.getDescription();
  editPriorityInput.value = item.getPriority();
  editDateInput.value = item.getDate();
  editNoteInput.value = item.getNote();
  editProjectInput.value = item.getProjectName();
  }

  function showProjContent() {
    const projects = document.querySelectorAll(".proj");
    projects.forEach((item) => {
      item.addEventListener("click", (event) => {
        const itemId = event.target.dataset.id;
        projectsArray.forEach((item) => {
          if (item[0] === itemId) {
            displayTask(item);
          }
        });
      });
    });
  }

  function createProject() {
    const createProjectBtn = document.querySelector(".createProjectBtn");
    const projectName = document.querySelector("#projectName");
    createProjectBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let newArray = [];
      let arrayToken = crypto.randomUUID();
      newArray[0] = arrayToken;
      newArray[1] = projectName.value;
      projectsArray.push(newArray);
      displayProject();
      console.log(projectsArray);
      projDialog.close();
    });
  }

  function showProjectDialog() {
    const newProjectBtn = document.querySelector(".newProjectBtn");
    newProjectBtn.addEventListener("click", () => {
      projDialog.showModal();
    });
  }


  function displayTask(proj) {
    taskDiv.innerHTML = "";
    for (let i = 2; i < proj.length; i++) {
      const item = proj[i];
      const div = document.createElement("div");
      const taskTitle = document.createElement("h2");
      const taskDate = document.createElement("span");
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.setAttribute("data-id", item.getId());
      checkBox.classList.add("check");
      div.setAttribute("data-id", item.getId());
      div.classList.add("taskItem");
      taskTitle.innerText = item.getTitle();
      taskDate.innerText = item.getDate();
      div.appendChild(checkBox);
      div.appendChild(taskTitle);
      div.appendChild(taskDate);
      taskDiv.appendChild(div);

      
div.addEventListener('click', ()=> {
 
   updateTask(item);
   saveUpdate(item);
  editDialog.showModal();
 populateEditProjectDropDown();
  
});
    }
    
    deleteTask(proj);
  }

  function deleteTask(proj) {
    const checkOption = document.querySelectorAll(".check");
    checkOption.forEach((item) => {
      item.addEventListener("click", (event) => {
        const checkId = event.target.dataset.id;
        const itemIndex = proj.findIndex(
          (task, indx) => indx > 1 && task.getId() === checkId
        );

        proj.splice(itemIndex, 1);

        displayTask(proj);
      });
    });
  }

 function populateProjectDropDown() {
  const projDropDown = document.querySelector("#projectInput");
  projDropDown.innerHTML = "";

 
  const defaultOption = document.createElement("option");
  defaultOption.textContent = projectsArray[0][1];
  defaultOption.value = projectsArray[0][1];
  projDropDown.appendChild(defaultOption);


  projectsArray.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item[1];
    option.value = item[1];
    projDropDown.appendChild(option);
  });
}
function populateEditProjectDropDown() {
  const editProjDropDown = document.querySelector("#editProjectInput");
  editProjDropDown.innerHTML = "";
  projectsArray.forEach(item => {
    const option = document.createElement("option");
    option.textContent = item[1];
    option.value = item[1];
    editProjDropDown.appendChild(option);
  });
}

  function createTask() {
    const titleInput = document.querySelector("#titleInput");
    const descriptionInput = document.querySelector("#descriptionInput");
    const priorityInput = document.querySelector("#priorityInput");
    const dateInput = document.querySelector("#dateInput");
    const noteInput = document.querySelector("#noteInput");
    const createTaskBtn = document.querySelector("#createTask");
    const projInput = document.querySelector("#projectInput");
    createTaskBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const newTask = createTodo();
      newTask.updateTitle( titleInput.value);
      newTask.updateDescription( descriptionInput.value);
      newTask.updatePriority(priorityInput.value);
      newTask.updateDate( dateInput.value);
      newTask.updateId();
      newTask.updateProject( projInput.value);
      projectsArray.forEach((item) => {
        if (item[1] === newTask.getProjectName()) {
          item.push(newTask);
        }
      });

      taskDialog.close();
    });
  }

  function showDialog() {
    const newTaskBtn = document.querySelector(".addTask");

    newTaskBtn.addEventListener("click", () => {
      taskDialog.showModal();
      populateProjectDropDown();
    });
  }

  function deleteProject(){
    const deleteProjBtn=document.querySelectorAll('.deleteProj');
    deleteProjBtn.forEach((item)=>{
      item.addEventListener('click',(event)=>{
        const projId=event.target.dataset.id;
        const projIndex=projectsArray.findIndex((project)=>project[0]===projId);
        projectsArray.splice(projIndex,1);
        displayProject();
        taskDiv.innerHTML="";
      });
    });
  }  


  showDialog();
  createTask();
  createProject();
  showProjectDialog();
}

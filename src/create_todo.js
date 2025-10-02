import { parse} from 'date-fns';


export function createTodo(){
    let todoTitle = "";
    let todoDescription="";
    let todoPriority="";
    let todoDate;
    let todoNote="";
    let id;
    let projectName;
 const updateTitle=(title)=> {todoTitle=title};
 const updateDescription=(description)=> {todoDescription=description};
 const updatePriority=(priority)=> {todoPriority=priority};
 const updateDate=(date)=> {
  
    const myDateFormat = "yyyy-MM-dd";
    const parsedDate = parse(date, myDateFormat, new Date());
    return todoDate=parsedDate;
};
const updateId=()=>{id=crypto.randomUUID()};
const updateProject=(project)=>{projectName=project};
 const updateNote=(note)=> {todoNote=note};
 const getTitle=()=>todoTitle;
 const getDescription=()=>todoDescription;
 const getPriority=()=>todoPriority;
 const getDate=()=>todoDate;
 const getNote=()=>todoNote;
 const getId=()=>id;
 const getProjectName=()=>projectName;
 
 return{updateTitle,updateDescription,updatePriority,updateDate,updateNote,getTitle,getDescription,getPriority,getDate,getNote,updateId,getId,updateProject,getProjectName};

   
}


//     const todo1 = createTodo("mytask1","this is my todo","first priority","01/10/2025","my Note");
// todo1.updateTitle();
// todo1.updateDescription();
// todo1.updatePriority();
// todo1.updateDate();
// todo1.updateNote();


// console.log(todo1.getTitle(),todo1.getNote(),todo1.getDate());

// const todo2 = createTodo("mytask2");
// todo2.updateTitle();
// console.log(todo2.getTitle());
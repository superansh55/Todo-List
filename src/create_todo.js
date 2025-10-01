import { parse} from 'date-fns';


export function createTodo(title,description,priority,date,note){
    let todoTitle = "";
    let todoDescription="";
    let todoPriority="";
    let todoDate;
    let todoNote="";
 const updateTitle=()=> {todoTitle=title};
 const updateDescription=()=> {todoDescription=description};
 const updatePriority=()=> {todoPriority=priority};
 const updateDate=()=> {
  
    const myDateFormat = "yyyy-mm-dd";
    const parsedDate = parse(date, myDateFormat, new Date());
    return todoDate=parsedDate;
};
 const updateNote=()=> {todoNote=note};
 const getTitle=()=>todoTitle;
 const getDescription=()=>todoDescription;
 const getPriority=()=>todoPriority;
 const getDate=()=>todoDate;
 const getNote=()=>todoNote;
 
 return{updateTitle,updateDescription,updatePriority,updateDate,updateNote,getTitle,getDescription,getPriority,getDate,getNote};

   
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
import { parse } from 'date-fns';

export function createTodo() {
  let todoTitle = "";
  let todoDescription = "";
  let todoPriority = "";
  let todoDate = null;
  let todoNote = "";
  let id;
  let projectName;

  const updateTitle = (title) => { todoTitle = title; };
  const updateDescription = (description) => { todoDescription = description; };
  const updatePriority = (priority) => { todoPriority = priority; };
  
  const updateDate = (date) => {
    if (!date || date === '') {
      todoDate = null;
      return;
    }
    
    
    if (date instanceof Date) {
      todoDate = date;
      return;
    }
    
    
    if (typeof date === 'string' && date.includes('T')) {
      todoDate = new Date(date);
      return;
    }
    
    
    const myDateFormat = "yyyy-MM-dd";
    try {
      const parsedDate = parse(date, myDateFormat, new Date());
      todoDate = parsedDate;
    } catch (error) {
      console.error('Error parsing date:', error);
      todoDate = null;
    }
  };

  const updateId = () => { id = crypto.randomUUID(); };
  const updateProject = (project) => { projectName = project; };
  const updateNote = (note) => { todoNote = note; };
  
  const getTitle = () => todoTitle;
  const getDescription = () => todoDescription;
  const getPriority = () => todoPriority;
  const getDate = () => todoDate;
  const getNote = () => todoNote;
  const getId = () => id;
  const getProjectName = () => projectName;

  return {
    updateTitle,
    updateDescription,
    updatePriority,
    updateDate,
    updateNote,
    getTitle,
    getDescription,
    getPriority,
    getDate,
    getNote,
    updateId,
    getId,
    updateProject,
    getProjectName
  };
}
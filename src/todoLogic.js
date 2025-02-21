import createProject from "./logic/project.js";
import createTodoStorageController from "./todoStorageController.js";
import { format } from "date-fns";

export default function todoLogic() {
  let currentLastProjectId = 0;
  
  let projects = [];
  function getProjects()  {return projects};
  
  let activeProjectId = 0;
  function getActiveProjectId() {return activeProjectId};
  function setActiveProjectId(id) {activeProjectId=id};

  let todoStorageController = createTodoStorageController();
  

  function getActiveProjectTasks() {
    let projectIndex = projects.findIndex(
    (project) => project.id === activeProjectId,
    );
    return projects[projectIndex].tasks
  }
  function getActiveProject(){
    return projects.find((project) => project.id === activeProjectId)
  }
  
  function addProject(properties) {
    activeProjectId = currentLastProjectId;
    projects.push(
      createProject(properties.concat(currentLastProjectId++)),
    );
    todoStorageController.saveTodos(projects);
    }
  function updateProject(id, properties) {
    let index = projects.findIndex((project) => project.id === id);
    projects[index] = createProject(properties.concat(id));
    todoStorageController.saveTodos(projects);
  }
  function removeProject(id) {
    let index = projects.findIndex((project) => project.id === id);
    projects.splice(index, 1);
    if (id === activeProjectId) {
      for (let i = 0; i < 100; i++) {
        if (projects[i] !== undefined) {
          activeProjectId = projects[i].id;
        }
      }
    }
    todoStorageController.saveTodos(projects);
  }

  function createTodo(properties) {
    let projectIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    projects[projectIndex].addTask(properties);
    todoStorageController.saveTodos(projects);    
  }
  function updateTodo(id, properties) {
    let projectIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    projects[projectIndex].updateTask(id, properties);
    todoStorageController.saveTodos(projects);
  }
  function removeTodo(id) {
    let projectIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    projects[projectIndex].removeTask(id);
    todoStorageController.saveTodos(projects);
  }
  function changeTodoCompletion(id) {
    let projectIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    projects[projectIndex].changeTaskCompletion(id);
    todoStorageController.saveTodos(projects);
  }
  
  function addTestTodos() {
    addProject(["123", "123"]);
    createTodo([
      "title",
      "description",
      format(new Date(2025, 2, 10), "MM/dd/yyyy"),
      "low",
      true,
    ]);
    createTodo([
      "title",
      "description",
      format(new Date(2025, 2, 20), "MM/dd/yyyy"),
      "medium",
      true,
    ]);
    createTodo([
      "title",
      "description",
      format(new Date(2025, 2, 30), "MM/dd/yyyy"),
      "high",
      true,
    ]);
    addProject(["123abc", "123"]);
  }

  if(todoStorageController.importData()===undefined || todoStorageController.importData().length===0) {addTestTodos()}
  projects = todoStorageController.importData();

  return {
    addProject,
    updateProject,
    removeProject,
    createTodo,
    updateTodo,
    removeTodo,
    changeTodoCompletion,
    getActiveProjectId,
    setActiveProjectId,
    getProjects,
    getActiveProjectTasks,
    getActiveProject
  };
}

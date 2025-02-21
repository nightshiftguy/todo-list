import createProject from "./logic/project.js";
import createTodoStorageController from "./todoStorageController.js";
import { format } from "date-fns";

export default function todoLogic() {
  let currentLastProjectId = 0;
  let projects = [];
  let activeProjectId = 0;
  let todoStorageController = createTodoStorageController();
  
  function addProject(properties) {
    if(this === undefined){
      activeProjectId = currentLastProjectId;
    projects.push(
      createProject(properties.concat(currentLastProjectId++)),
    );
    todoStorageController.saveTodos(projects);
    }else{
    this.activeProjectId = currentLastProjectId;
    this.projects.push(
      createProject(properties.concat(currentLastProjectId++)),
    );
    todoStorageController.saveTodos(this.projects);
    }}
  function updateProject(id, properties) {
    let index = this.projects.findIndex((project) => project.id === id);
    this.projects[index] = createProject(properties.concat(id));
    todoStorageController.saveTodos(this.projects);
  }
  function removeProject(id) {
    let index = this.projects.findIndex((project) => project.id === id);
    this.projects.splice(index, 1);
    if (id === this.activeProjectId) {
      for (let i = 0; i < 100; i++) {
        if (this.projects[i] !== undefined) {
          this.activeProjectId = this.projects[i].id;
        }
      }
    }
    todoStorageController.saveTodos(this.projects);
  }

  function createTodo(properties) {
    if(this === undefined){let projectIndex = projects.findIndex(
      (project) => project.id === activeProjectId,
    );
    projects[projectIndex].addTask(properties);
    todoStorageController.saveTodos(projects);}
    else
    {let projectIndex = this.projects.findIndex(
      (project) => project.id === this.activeProjectId,
    );
    this.projects[projectIndex].addTask(properties);
    todoStorageController.saveTodos(this.projects);}
    
  }
  function updateTodo(id, properties) {
    let projectIndex = this.projects.findIndex(
      (project) => project.id === this.activeProjectId,
    );
    this.projects[projectIndex].updateTask(id, properties);
    todoStorageController.saveTodos(this.projects);
  }
  function removeTodo(id) {
    let projectIndex = this.projects.findIndex(
      (project) => project.id === this.activeProjectId,
    );
    this.projects[projectIndex].removeTask(id);
    todoStorageController.saveTodos(this.projects);
  }
  function changeTodoCompletion(id) {
    let projectIndex = this.projects.findIndex(
      (project) => project.id === this.activeProjectId,
    );
    this.projects[projectIndex].changeTaskCompletion(id);
    todoStorageController.saveTodos(this.projects);
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
    console.log("add test todos")
  }

  if(todoStorageController.importData()===undefined || todoStorageController.importData().length===0) {addTestTodos()}
  projects = todoStorageController.importData();
  console.log(projects)
  return {
    addProject,
    updateProject,
    removeProject,
    createTodo,
    updateTodo,
    removeTodo,
    changeTodoCompletion,
    projects,
    activeProjectId,
  };
}

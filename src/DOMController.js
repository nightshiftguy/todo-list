import createProjectCard from "./DOM/projectCard";
import createNewProjectDialog from "./DOM/newProjectDialog"
import createTaskCard from "./DOM/taskCard";
import createNewTaskDialog from "./DOM/newTaskDialog";
//import createNewTaskAndSelectProjectDialog from "./DOM/newTaskAndSelectProjectDialog"
import createAddButton from "./DOM/addButton";
import createInfoCard from "./DOM/infoCard";

import todoLogic from "./todoLogic";

const logic = todoLogic();

function createProjectsContainerController(){
  const projectsContainer = document.createElement("div");
  projectsContainer.setAttribute("class", "projects-container");

  function selectProject(id) {
    const oldActiveProject = projectsContainer.querySelector(
      `[item-id="${logic.getActiveProjectId()}"`,
    );
    if (oldActiveProject !== null && oldActiveProject !== undefined)
      oldActiveProject.setAttribute("selected", "false");
    logic.setActiveProjectId(id);
    const newActiveProject = projectsContainer.querySelector(
      `[item-id="${logic.getActiveProjectId()}"`,
    );
    if (newActiveProject !== null && newActiveProject !== undefined)
      newActiveProject.setAttribute("selected", "true");
  }

  function displayProjects() {
    projectsContainer.textContent = "";
    if (logic.getProjects().length === 0) {
      const infoCard = createInfoCard("no projects to show");
      projectsContainer.appendChild(infoCard);
      projectsContainer.appendChild(createAddButton("project"));
      return;
    }
    for (let project of logic.getProjects()) {
      const projectCard = createProjectCard(
        project.title,
        project.description,
        project.id,
      );
      projectsContainer.appendChild(projectCard);
    }
    
    projectsContainer.appendChild(createAddButton("project"));
  }

  return {projectsContainer, selectProject, displayProjects}
}

function createTasksContainerController(){
  const tasksContainer = document.createElement("div");
  tasksContainer.setAttribute("class", "tasks-container");

  function displayTasks() {
    tasksContainer.textContent = "";
    if (
      logic.getActiveProject() === undefined ||
      logic.getActiveProjectTasks().length === 0
    ) {
      const infoCard = createInfoCard("this project is empty");
      tasksContainer.appendChild(infoCard);
      tasksContainer.appendChild(createAddButton("task"));
      return;
    }

    for (let task of logic.getActiveProjectTasks()) {
      const taskCard = createTaskCard(
        task.title,
        task.description,
        task.dueDate,
        task.completed,
        task.priority,
        task.id,
      );
      tasksContainer.appendChild(taskCard);
    }

    tasksContainer.appendChild(createAddButton("task"));
  }

  return {tasksContainer, displayTasks}
}

export default function createDOMController() {
  const container = document.querySelector(".container");
  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("class", "main-container");

  const projectsContainerController = createProjectsContainerController();
  const projectsContainer = projectsContainerController.projectsContainer;

  document.addEventListener("add-project",()=>{
    const newProjectDialog = createNewProjectDialog();
    container.appendChild(newProjectDialog);
    newProjectDialog.showModal();
  })
  document.addEventListener("submit-new-project",(event)=>{
    logic.addProject(event.detail.properties)
    projectsContainerController.displayProjects();
    projectsContainerController.selectProject(logic.getActiveProjectId());
    tasksContainerController.displayTasks();
  })

  const tasksContainerController = createTasksContainerController();
  const tasksContainer = tasksContainerController.tasksContainer;

  document.addEventListener("add-task",()=>{
    const newTaskDialog = createNewTaskDialog();
    container.appendChild(newTaskDialog);
    newTaskDialog.showModal();
  })
  document.addEventListener("submit-new-task",(event)=>{
    logic.createTodo(event.detail.properties);
    tasksContainerController.displayTasks();
  })
  

  document.addEventListener("delete", (event)=>{
    let id = event.detail.id;
    if(event.detail.itemToDelete === "task"){
      tasksContainer.querySelector(`[item-id="${id}"`).remove();
      logic.removeTodo(parseInt(id));
    }
    if(event.detail.itemToDelete==="project"){
      projectsContainer.querySelector(`[item-id="${id}"`).remove();
      logic.removeProject(id);
      projectsContainerController.selectProject(logic.getActiveProjectId());
      if (id === logic.getActiveProjectId()) {
        tasksContainerController.displayTasks();
      }
    }
  })
  
  projectsContainerController.displayProjects();
  projectsContainerController.selectProject(logic.getActiveProjectId());
  tasksContainerController.displayTasks();
  
  //select project
  projectsContainer.querySelectorAll(".project-card").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.getAttribute("class") === "delete-button") return;
      const id = parseInt(element.getAttribute("item-id"));
      console.log(id)
      projectsContainerController.selectProject(id);
      tasksContainerController.displayTasks();
    });
  });

  mainContainer.appendChild(projectsContainer);
  mainContainer.appendChild(tasksContainer);

  container.appendChild(mainContainer);
}

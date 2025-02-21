import createProjectCard from "./DOM/projectCard";
//import createNewProjectDialog from "./DOM/newProjectDialog"
import createTaskCard from "./DOM/taskCard";
//import createNewTaskDialog from "./DOM/newTaskDialog"
//import createNewTaskAndSelectProjectDialog from "./DOM/newTaskAndSelectProjectDialog"
//import createAddButton from "./DOM/addButton"
import createInfoCard from "./DOM/infoCard";

import todoLogic from "./todoLogic";

//import { format } from "date-fns";

export default function createDOMController() {
  const logic = todoLogic();

  const container = document.querySelector(".container");
  const mainContainer = document.createElement("div");
  mainContainer.setAttribute("class", "main-container");

  const projectsContainer = document.createElement("div");
  projectsContainer.setAttribute("class", "projects-container");

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

    tasksContainer
      .querySelectorAll("[click-action='deleteTask'")
      .forEach((element) => {
        element.addEventListener("click", () => {
          const id = element.getAttribute("item-id");
          tasksContainer.querySelector(`[item-id="${id}"`).remove();
          logic.removeTodo(parseInt(id));
        });
      });
  }

  function selectProject(id) {
    const oldActiveProject = projectsContainer.querySelector(
      `[item-id="${logic.getActiveProjectId()}"`,
    );
    if (oldActiveProject !== null && oldActiveProject !== undefined)
      oldActiveProject.setAttribute("selected", "false");
    logic.setActiveProjectId(id)
    const newActiveProject = projectsContainer.querySelector(
      `[item-id="${logic.getActiveProjectId()}"`,
    );
    if (newActiveProject !== null && newActiveProject !== undefined)
      newActiveProject.setAttribute("selected", "true");
  }

  function displayProjects() {
    tasksContainer.textContent = "";
    if (logic.getProjects().length === 0) {
      const infoCard = createInfoCard("no projects to show");
      tasksContainer.appendChild(infoCard);
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

    projectsContainer
      .querySelectorAll("[click-action='deleteProject'")
      .forEach((element) => {
        element.addEventListener("click", () => {
          const id = parseInt(element.getAttribute("item-id"));
          projectsContainer.querySelector(`[item-id="${id}"`).remove();
          logic.removeProject(id);
          if (id === logic.getActiveProjectId()) {
            displayTasks();
          }
        });
      });

    //select project
    projectsContainer.querySelectorAll(".project-card").forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target.getAttribute("class") === "delete-button") return;
        const id = parseInt(element.getAttribute("item-id"));
        selectProject(id);
        displayTasks();
      });
    });
  }

  displayProjects();
  selectProject(logic.getActiveProjectId());
  displayTasks();

  mainContainer.appendChild(projectsContainer);
  mainContainer.appendChild(tasksContainer);

  container.appendChild(mainContainer);
}

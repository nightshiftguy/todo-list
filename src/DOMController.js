import createProjectCard from "./DOM/projectCard";
import createNewProjectDialog from "./DOM/newProjectDialog";
import createTaskCard from "./DOM/taskCard";
import createNewTaskDialog from "./DOM/newTaskDialog";
import createNewTaskAndSelectProjectDialog from "./DOM/newTaskAndSelectProjectDialog";
import createAddButton from "./DOM/addButton";

import todoLogic from "./todoLogic";

export default function createDOMController(){
    const container = document.getElementById("container");
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("class","main-container");
    //window["functionName"](arguments);

    const projectsContainer = document.createElement("div");
    projectsContainer.setAttribute("class","projects-container");

    const tasksContainer = document.createElement("div");
    tasksContainer.setAttribute("class","tasks-container");

    mainContainer.appendChild(projectsContainer);
    mainContainer.appendChild(tasksContainer);

    container.appendChild(mainContainer);
}
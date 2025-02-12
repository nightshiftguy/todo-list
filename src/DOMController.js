import createProjectCard from "./DOM/projectCard";
import createNewProjectDialog from "./DOM/newProjectDialog";
import createTaskCard from "./DOM/taskCard";
import createNewTaskDialog from "./DOM/newTaskDialog";
import createNewTaskAndSelectProjectDialog from "./DOM/newTaskAndSelectProjectDialog";
import createAddButton from "./DOM/addButton";

import todoLogic from "./todoLogic";

export default function createDOMController(){
    const logic = todoLogic();

    logic.addProject(["123","123"])
    console.log(logic.projects[0])
    logic.createTodo(["title","description","date","priority", true])
    console.log(logic.projects[0].tasks[0])
    logic.changeTodoCompletion(0)
    console.log(logic.projects[0].tasks[0])

    const container = document.getElementById("container");
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("class","main-container");
    //window["functionName"](arguments);

    const projectsContainer = document.createElement("div");
    projectsContainer.setAttribute("class","projects-container");
    for(let project of logic.projects){
        const projectCard = createProjectCard(project.title, project.description, project.id);
        projectsContainer.appendChild(projectCard);
    }

    const tasksContainer = document.createElement("div");
    tasksContainer.setAttribute("class","tasks-container");

    mainContainer.appendChild(projectsContainer);
    mainContainer.appendChild(tasksContainer);

    container.appendChild(mainContainer);
}
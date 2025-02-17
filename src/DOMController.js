import createProjectCard from "./DOM/projectCard";
import createNewProjectDialog from "./DOM/newProjectDialog";
import createTaskCard from "./DOM/taskCard";
import createNewTaskDialog from "./DOM/newTaskDialog";
import createNewTaskAndSelectProjectDialog from "./DOM/newTaskAndSelectProjectDialog";
import createAddButton from "./DOM/addButton";

import todoLogic from "./todoLogic";

import createTodoStorageController from "./todoStorageController";

import {format} from "date-fns";

export default (function createDOMController(){
    const logic = todoLogic();
    const storageController = createTodoStorageController();

    logic.addProject(["123","123"])
    logic.createTodo(["title","description",format(new Date(2025, 2, 10), "MM/dd/yyyy"),"low", true]);
    logic.createTodo(["title","description",format(new Date(2025, 2, 20), "MM/dd/yyyy"),"medium", true]);
    logic.createTodo(["title","description",format(new Date(2025, 2, 30), "MM/dd/yyyy"),"high", true]);
    logic.changeTodoCompletion(0)
    logic.addProject(["123abc","123"])
    console.log(logic.projects[0])
    console.log(logic.projects[0].tasks[0])
    console.log(logic.activeProjectId)

    const container = document.querySelector(".container");
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("class","main-container");
    
    const projectsContainer = document.createElement("div");
    projectsContainer.setAttribute("class","projects-container");
    
    const tasksContainer = document.createElement("div");
    tasksContainer.setAttribute("class","tasks-container");
    
    function displayTasks(){
        tasksContainer.textContent="";
        if(logic.projects[logic.activeProjectId] === undefined || logic.projects[logic.activeProjectId].tasks[0] === undefined){
            const noTasksInfo = document.createElement("p")
            noTasksInfo.textContent = "this project is empty";
            tasksContainer.appendChild(noTasksInfo);
            return;
        }
        for(let task of logic.projects[logic.activeProjectId].tasks){
            const taskCard = createTaskCard(task.title, task.description, task.dueDate, task.completed, task.priority, task.id);
            tasksContainer.appendChild(taskCard);
        }

        tasksContainer.querySelectorAll("[click-action='deleteTask'").forEach((element)=>{
            element.addEventListener("click",() =>{
                const id = element.getAttribute("item-id");
                tasksContainer.querySelector(`[item-id="${id}"`).remove();
                logic.removeTodo(parseInt(id));
                console.log(logic.projects[0])
            });
        });
    }

    function selectProject(id){
        if(projectsContainer.querySelector(`[item-id="${logic.activeProjectId}"`) !== null)
            projectsContainer.querySelector(`[item-id="${logic.activeProjectId}"`).setAttribute("selected","false");
        logic.activeProjectId=id;
        projectsContainer.querySelector(`[item-id="${logic.activeProjectId}"`).setAttribute("selected","true");
    }
    
    function displayProjects(){
        tasksContainer.textContent="";
        for(let project of logic.projects){
            const projectCard = createProjectCard(project.title, project.description, project.id);
            projectsContainer.appendChild(projectCard);
        }

        projectsContainer.querySelectorAll("[click-action='deleteProject'").forEach((element)=>{
            element.addEventListener("click",() =>{
                const id = parseInt(element.getAttribute("item-id"));
                projectsContainer.querySelector(`[item-id="${id}"`).remove();
                logic.removeProject(id);
                if(id === logic.activeProjectId){
                    displayTasks();
                }
            });
        });
    
        //select project
        projectsContainer.querySelectorAll(".project-card").forEach((element)=>{
            element.addEventListener("click",(event) =>{
                if(event.target.getAttribute("class") === "delete-button")  return;
                const id = parseInt(element.getAttribute("item-id"));
                selectProject(id);
                displayTasks();
            });
        });
    }
    
    displayProjects();
    selectProject(logic.activeProjectId);
    displayTasks();

    mainContainer.appendChild(projectsContainer);
    mainContainer.appendChild(tasksContainer);

    container.appendChild(mainContainer);
})();
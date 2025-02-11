import createProject from "./logic/project.js";

export default function todoLogic(){
    let currentLastProjectId=0;
    let projects = [];
    let activeProjectId=0;

    function addProject(properties){
        activeProjectId=currentLastProjectId;
        projects.push(createProject(properties.concat(currentLastProjectId++)));
    };
    function updateProject(id, properties){
        let index = projects.findIndex(project=>project.id===id);
        projects[index]=createProject(properties.concat(id));
    };
    function removeProject(id){
        projects.splice(projects.findIndex(project=>project.id===id),1);
    };

    function createTodo(properties){
        let projectIndex = projects.findIndex(project=>project.id === activeProjectId);
        projects[projectIndex].addTask(properties);
    }
    function updateTodo(id,properties){
        let projectIndex = projects.findIndex(project=>project.id===activeProjectId);
        projects[projectIndex].updateTask(id,properties);
    }
    function removeTodo(id){
        let projectIndex = projects.findIndex(project=>project.id===activeProjectId);
        projects[projectIndex].removeTask(id);
    }
    function changeTodoCompletion(id){
        let projectIndex = projects.findIndex(project=>project.id===activeProjectId);
        projects[projectIndex].changeTaskCompletion(id);
    }

    return  {addProject, updateProject, removeProject, createTodo, updateTodo, removeTodo, changeTodoCompletion, projects, activeProjectId};
}
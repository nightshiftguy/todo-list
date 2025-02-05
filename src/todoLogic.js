import createProject from "./project";

export default function todoLogic(){
    let currentLastProjectId=0;
    let projectList = [];
    let activeProjectId=0;

    function addProject(properties){
        projectList.push(createProject(properties.concat(currentLastProjectId++)));
    };
    function updateProject(id, properties){
        let index = projectList.findIndex(project=>project.id===id);
        projectList[index]=createProject(properties.concat(id));
    };
    function removeProject(id){
        projectList.splice(projectList.findIndex(project=>project.id===id),1);
    };

    function createTodo(properties){
        let projectIndex = projectList.findIndex(project=>project.id === currentLastProjectId);
        projectList[projectIndex].addTask(properties);
    }
    function updateTodo(id,properties){
        let projectIndex = projectList.findIndex(project=>project.id===currentLastProjectId);
        projectList[projectIndex].updateTask(id,properties);
    }
    function removeTodo(id){
        let projectIndex = projectList.findIndex(project=>project.id===currentLastProjectId);
        projectList[projectIndex].removeTask(id);
    }
    function changeTodoCompletion(id){
        let projectIndex = projectList.findIndex(project=>project.id===currentLastProjectId);
        projectList[projectIndex].changeTaskCompletion(id);
    }

    return  {addProject, updateProject, removeProject, createTodo, updateTodo, removeTodo, changeTodoCompletion, projectList, activeProjectId};
}
import createProject from "./logic/project.js";

export default function todoLogic(){
    let currentLastProjectId=0;
    let projects = [];
    let activeProjectId=0;

    function addProject(properties){
        this.activeProjectId=currentLastProjectId;
        this.projects.push(createProject(properties.concat(currentLastProjectId++)));
    };
    function updateProject(id, properties){
        let index = this.projects.findIndex(project=>project.id===id);
        this.projects[index]=createProject(properties.concat(id));
    };
    function removeProject(id){
        let index = this.projects.findIndex(project=>project.id===id);
        this.projects.splice(index,1);
        if(id===this.activeProjectId){
            for(let i=0; i<100; i++){
                if(this.projects[i]!==undefined){
                    this.activeProjectId=this.projects[i].id;
                }
            }
        }
    };

    function createTodo(properties){
        let projectIndex = this.projects.findIndex(project=>project.id === this.activeProjectId);
        this.projects[projectIndex].addTask(properties);
    }
    function updateTodo(id,properties){
        let projectIndex = this.projects.findIndex(project=>project.id===this.activeProjectId);
        this.projects[projectIndex].updateTask(id,properties);
    }
    function removeTodo(id){
        let projectIndex = this.projects.findIndex(project=>project.id===this.activeProjectId);
        this.projects[projectIndex].removeTask(id);
    }
    function changeTodoCompletion(id){
        let projectIndex = this.projects.findIndex(project=>project.id===this.activeProjectId);
        this.projects[projectIndex].changeTaskCompletion(id);
    }

    return  {addProject, updateProject, removeProject, createTodo, updateTodo, removeTodo, changeTodoCompletion, projects, activeProjectId};
}
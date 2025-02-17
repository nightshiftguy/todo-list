import createTask from "./task.js";

export default function createProject(projectProperties){
    let [title, description, id] = projectProperties;

    let currentLastTaskId = 0;
    let tasks = [];

    function addTask(properties){
        tasks.push(createTask(properties.concat(currentLastTaskId++)));
        console.log("added task")
        console.log(tasks)
    }
    function removeTask(id){
        console.log("tasks before deletion:")
        console.log(tasks);
        tasks.splice(tasks.findIndex(task=> task.id === id),1);
    }
    function updateTask(id, properties){
        let index = tasks.findIndex(task=>task.id===id);
        tasks[index]=createTask(properties.concat(id));
    }

    function changeTaskCompletion(id){
        let index = tasks.findIndex(task=>task.id===id);
        tasks[index].completed= !tasks[index].completed;
    }
    return {title, description, tasks, id, addTask, removeTask, updateTask, changeTaskCompletion}
}
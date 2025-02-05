import createTask from "./task.js";

export default function createProject(title, description, id){
    let currentLastTaskId = 0;
    let taskList = [];

    function addTask(properties){
        taskList.push(createTask(properties.concat(currentLastTaskId++)));
    };
    function removeTask(id){
        taskList.splice(taskList.findIndex(task=> task.id === id),1);
    };
    function updateTask(id, properties){
        let index = taskList.findIndex(task=>task.id===id);
        taskList[index]=createTask(properties.concat(id));
    }

    function changeTaskCompletion(id){
        let index = taskList.findIndex(task=>task.id===id);
        taskList[index].completed= !tasklist[index].completed;
    }
    return {title, description, taskList, id, addTask, removeTask, updateTask, changeTaskCompletion}
}
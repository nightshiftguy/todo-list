export default function createTask(taskProperties){
    let [title, description, dueDate, priority, completed, id] = taskProperties;
    return {title, description, dueDate, priority, completed, id}
}
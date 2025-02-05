export default function createTask(title, description, dueDate, priority = Priority.MEDIUM, completed=false, id){
    return {title, description, dueDate, priority, completed, id}
}
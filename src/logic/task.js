export default function createTask(taskProperties) {
  let [title, description, dueDate, priority, completed, id] = taskProperties;
  function toJSON() {
    return taskProperties;
  }
  return { title, description, dueDate, priority, completed, id, toJSON };
}

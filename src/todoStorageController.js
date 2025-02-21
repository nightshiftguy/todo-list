import createProject from "./logic/project";

export default function createTodoStorageController() {
  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        storage &&
        storage.length !== 0
      );
    }
  }
  function importData() {
    if (storageAvailable("localStorage")) {
      const todos = JSON.parse(localStorage.getItem("todos"), (key, value) => {
        if (key === "projects") {
          let projects = [];
          for (let projectStringified of value) {
            let project = createProject(projectStringified.projectProperties);
            for (let taskProperties of projectStringified.projectTasks) {
              project.addTask(taskProperties);
            }
            projects.push(project);
          }
          return projects;
        }
        return value;
      });
      if(todos)
        return todos.projects;
      else
        return;
    } else {
      console.log("local storage not available");
    }
  }
  function saveTodos(todos) {
    if (storageAvailable("localStorage")) {
      localStorage.setItem("todos", JSON.stringify({ projects: todos }));
    }
  }
  return { importData, saveTodos };
}

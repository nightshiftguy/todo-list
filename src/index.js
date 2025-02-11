import './styles.css';
import todoLogic from "./todoLogic.js";

const logic = todoLogic();
logic.addProject(["123","123"])
console.log(logic.projectList[0])
logic.createTodo(["title","description","date","priority", true])
console.log(logic.projectList[0].taskList[0])
logic.changeTodoCompletion(0)
console.log(logic.projectList[0].taskList[0])
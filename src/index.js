import './styles.css';
import todoLogic from "./todoLogic.js";
import createDOMController from "./DOMController.js";

const logic = todoLogic();
logic.addProject(["123","123"])
console.log(logic.projects[0])
logic.createTodo(["title","description","date","priority", true])
console.log(logic.projects[0].tasks[0])
logic.changeTodoCompletion(0)
console.log(logic.projects[0].tasks[0])

const DOMController = createDOMController();
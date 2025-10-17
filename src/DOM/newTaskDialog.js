import { createTextInput,createSelectInput, createDateInput, createErrorMessage } from "./dialogElements";

export default function createNewTaskDialog() {
  const newTaskDialog = document.createElement("dialog");
  const dialogTitle = document.createElement("h1");
  dialogTitle.textContent = "Create new task:";

  const form = document.createElement("form");

  const inputs = [
    ...createTextInput("title", "title-input",true),
    ...createTextInput("description","description-input",false),
    ...createDateInput("due date","date-input",true),
    ...createSelectInput("priority", ["low", "medium", "high"], "priority-input"),
  ];

  const errorMessage = createErrorMessage();

  function validateInputs(title, dueDate){
    if(title === "" || dueDate === NaN || dueDate ===""){
      errorMessage.showErrorMessage("fields with \"*\" can't be empty")
      return false;
    }
    else {
      errorMessage.hideErrorMessage()
      return true;
    }
  }

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "confirm";
  confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = form.querySelector("#title-input").value;
    const description = form.querySelector("#description-input").value;
    const dueDate = form.querySelector("#date-input").value;
    const priority = form.querySelector("#priority-input").value;

    if(!validateInputs(title, dueDate)){
      return;
    }

    const submitEvent = new CustomEvent("submit-new-task",{
      bubbles: true,
      detail: {"properties":[title,description,new Date(dueDate),priority,false]},
    });
    confirmButton.dispatchEvent(submitEvent);
    newTaskDialog.close();
  });


  inputs.forEach((input) => {
    form.appendChild(input);
  });

  form.appendChild(errorMessage.getErrorMessage())
  form.appendChild(confirmButton);

  newTaskDialog.appendChild(dialogTitle);
  newTaskDialog.appendChild(form);

  return newTaskDialog;
}

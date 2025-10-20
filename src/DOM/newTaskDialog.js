import { createTextInput,createSelectInput, createDateInput, createErrorMessage } from "./dialogElements";

export default function createNewTaskDialog() {
  const newTaskDialog = document.createElement("dialog");
  
  const form = document.createElement("form");
  form.noValidate = true;

  const dialogTitle = document.createElement("h1");
  dialogTitle.textContent = "Create new task:";
  form.appendChild(dialogTitle);
  
  const inputs = [
    ...createTextInput("title", "task-title-input",true),
    ...createTextInput("description","task-description-input",false),
    ...createDateInput("due date","task-date-input",true),
    ...createSelectInput("priority", ["low", "medium", "high"], "task-priority-input"),
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
    const title = form.querySelector("#task-title-input").value;
    const description = form.querySelector("#task-description-input").value;
    const dueDate = form.querySelector("#task-date-input").value;
    const priority = form.querySelector("#task-priority-input").value;

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
  newTaskDialog.appendChild(form);

  return newTaskDialog;
}

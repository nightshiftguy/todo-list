import { createTextInput, createErrorMessage } from "./dialogElements";

  
export default function createNewProjectDialog() {
    const newProjectDialog = document.createElement("dialog");
    const dialogTitle = document.createElement("h1");
    dialogTitle.textContent = "Create new task:";
  
    const form = document.createElement("form");
  
    const inputs = [
      ...createTextInput("title", "title-input", true),
      ...createTextInput("description","description-input", false),
    ];

    const errorMessage = createErrorMessage();

    function validateInputs(title){
    if(title === ""){
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
  
      if(!validateInputs(title)){
      return;
    }

      const submitEvent = new CustomEvent("submit-new-project",{
        bubbles: true,
        detail: {"properties":[title,description]},
      });
      confirmButton.dispatchEvent(submitEvent);
      newProjectDialog.close();
    });
  
    inputs.forEach((input) => {
      form.appendChild(input);
    });
  
    form.appendChild(errorMessage.getErrorMessage());
    form.appendChild(confirmButton);
  
    newProjectDialog.appendChild(dialogTitle);
    newProjectDialog.appendChild(form);
  
    return newProjectDialog;
  }
  
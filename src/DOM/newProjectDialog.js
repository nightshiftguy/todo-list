import { createTextInput, createErrorMessage } from "./dialogElements";

export default function createNewProjectDialog() {
  const newProjectDialog = document.createElement("dialog");  
  const form = document.createElement("form");
  form.noValidate = true;

  const dialogTitle = document.createElement("h1");
  dialogTitle.textContent = "Create new project:";
  form.appendChild(dialogTitle);
  
    const inputs = [
      ...createTextInput("title", "project-title-input", true),
      ...createTextInput("description","project-description-input", false),
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
      const title = form.querySelector("#project-title-input").value;
      const description = form.querySelector("#project-description-input").value;
  
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
    newProjectDialog.appendChild(form);
  
    return newProjectDialog;
  }
  
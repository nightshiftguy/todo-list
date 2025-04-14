function createTextInput(name, id) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = name;
  
    const input = document.createElement("input");
    input.setAttribute("id", id);
  
    return [label, input];
}
  
export default function createNewProjectDialog() {
    const newProjectDialog = document.createElement("dialog");
    const dialogTitle = document.createElement("h1");
    dialogTitle.textContent = "Create new task:";
  
    const form = document.createElement("form");
  
    const inputs = [
      ...createTextInput("title", "title-input"),
      ...createTextInput("description","description-input"),
    ];
  
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "confirm";
    confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      const title = form.querySelector("#title-input").value;
      const description = form.querySelector("#description-input").value;
  
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
  
    form.appendChild(confirmButton);
  
    newProjectDialog.appendChild(dialogTitle);
    newProjectDialog.appendChild(form);
  
    return newProjectDialog;
  }
  
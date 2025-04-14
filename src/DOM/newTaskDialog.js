function createTextInput(name, id) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = name;

  const input = document.createElement("input");
  input.setAttribute("id", id);

  return [label, input];
}

function createSelectInput(name, optionsNames, id) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = name;

  const select = document.createElement("select");
  select.setAttribute("id", id);
  optionsNames.forEach((optionName) => {
    const option = document.createElement("option");
    option.textContent = optionName;
    select.appendChild(option);
  });

  return [label, select];
}

export default function createNewTaskDialog() {
  const newTaskDialog = document.createElement("dialog");
  const dialogTitle = document.createElement("h1");
  dialogTitle.textContent = "Create new task:";

  const form = document.createElement("form");

  const inputs = [
    ...createTextInput("title", "title-input"),
    ...createTextInput("description","description-input"),
    ...createTextInput("due date","date-input"),
    ...createSelectInput("priority", ["low", "medium", "high"], "priority-input"),
  ];

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "confirm";
  confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = form.querySelector("#title-input").value;
    const description = form.querySelector("#description-input").value;
    const dueDate = form.querySelector("#date-input").value;
    const priority = form.querySelector("#priority-input").value;

    const submitEvent = new CustomEvent("submit-new-task",{
      bubbles: true,
      detail: {"properties":[title,description,dueDate,priority,false]},
    });
    confirmButton.dispatchEvent(submitEvent);
    newTaskDialog.close();
  });

  inputs.forEach((input) => {
    form.appendChild(input);
  });

  form.appendChild(confirmButton);

  newTaskDialog.appendChild(dialogTitle);
  newTaskDialog.appendChild(form);

  return newTaskDialog;
}

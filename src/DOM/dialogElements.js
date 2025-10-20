function createTextInput(name, id, required) {
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = name;
  
  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", "text");
  
  if(required){
    input.required = true;
  }

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

function createDateInput(name,id, required){
  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = name;

  const input = document.createElement("input");
  input.setAttribute("type","date");
  input.setAttribute("id", id);

  if(required){
    input.required = true;
  }

  return [label, input];
}

function createErrorMessage(){
  const errorMessage = document.createElement("p");
  errorMessage.setAttribute("class","error-message");

  function getErrorMessage(){
    return errorMessage;
  }

  function showErrorMessage(errorText){
    errorMessage.textContent = errorText;
    errorMessage.style.visibility = "visible";
  }

  function hideErrorMessage(){
    errorMessage.textContent = "";
    errorMessage.style.visibility = "hidden";
  }

  return {getErrorMessage, showErrorMessage, hideErrorMessage}
}

export {createTextInput, createSelectInput, createDateInput, createErrorMessage}
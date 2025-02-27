export default function createAddButton() {
  const container = document.createElement("div");
  const addButton = document.createElement("button");
  addButton.setAttribute("class", "add-button");
  addButton.textContent = "+";
  container.appendChild(addButton);

  return container;
}

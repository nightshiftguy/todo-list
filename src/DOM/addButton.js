export default function createAddButton(itemToAdd) {
  const container = document.createElement("div");
  const addButton = document.createElement("button");
  addButton.setAttribute("class", "add-button");
  addButton.textContent = `Add ${itemToAdd}`;

  addButton.addEventListener("click",()=>{
    const addEvent = new CustomEvent(`add-${itemToAdd}`,{
      bubbles: true
    });
    addButton.dispatchEvent(addEvent);
  })

  container.appendChild(addButton);

  return container;
}

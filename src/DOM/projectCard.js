export default function createProjectCard(title, description, id) {
  const projectCard = document.createElement("div");
  projectCard.setAttribute("class", "project-card");
  projectCard.setAttribute("item-id", id);

  const titleHeader = document.createElement("h2");
  titleHeader.textContent = title;
  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = description;
  const deleteButton = document.createElement("div");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("click-action", "deleteProject");
  deleteButton.setAttribute("item-id", id);

  deleteButton.addEventListener("click",()=>{
    const deleteEvent = new CustomEvent("delete",{
      bubbles: true,
      detail:{itemToDelete:"project", id}
    });
    deleteButton.dispatchEvent(deleteEvent);
  })

  projectCard.appendChild(titleHeader);
  projectCard.appendChild(descriptionParagraph);
  projectCard.appendChild(deleteButton);

  return projectCard;
}

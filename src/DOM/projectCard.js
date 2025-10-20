import deleteIconSrc from "../icons/delete.svg";

export default function createProjectCard(title, description, id) {
  const projectCard = document.createElement("div");
  projectCard.setAttribute("class", "project-card");
  projectCard.setAttribute("item-id", id);

  const titleHeader = document.createElement("h2");
  titleHeader.textContent = title;

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = "description: " + description;
  
  const deleteButton = document.createElement("div");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconSrc;
  deleteButton.appendChild(deleteIcon);
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

  projectCard.addEventListener("click",(event)=>{
    if (event.target.getAttribute("class") === "delete-button") return;
    const deleteEvent = new CustomEvent("select-project",{
      bubbles: true,
      detail:{id}
    });
    deleteButton.dispatchEvent(deleteEvent);
  })

  projectCard.appendChild(titleHeader);
  projectCard.appendChild(descriptionParagraph);
  projectCard.appendChild(deleteButton);

  return projectCard;
}

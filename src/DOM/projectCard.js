export default function createProjectCard(title, description, id){
    const projectCard = document.createElement("div");
    projectCard.setAttribute("class","project-card");
    projectCard.setAttribute("item-id",id);
    
    const titleHeader = document.createElement("h2");
    titleHeader.textContent = title;
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = description;
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("class","delete-button");
    deleteButton.setAttribute("click-action","delete")

    projectCard.appendChild(titleHeader);
    projectCard.appendChild(descriptionParagraph);
    projectCard.appendChild(deleteButton);

    return projectCard;
}
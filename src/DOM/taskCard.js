export default function createTaskCard(title, description, dueDate, priority, completed, id){
    const taskCard = document.createElement("div");
    taskCard.setAttribute("class","task-card");
    taskCard.setAttribute("item-id",id);

    const titleHeader = document.createElement("h2");
    titleHeader.textContent = title;
    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = description;
    const deleteButton = document.createElement("div");
    deleteButton.setAttribute("class","delete-button");
    deleteButton.setAttribute("click-action","deleteTask");
    deleteButton.setAttribute("item-id", id);


    taskCard.appendChild(titleHeader);
    taskCard.appendChild(descriptionParagraph);
    taskCard.appendChild(deleteButton);

    return taskCard;
}
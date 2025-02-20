export default function createTaskCard(
  title,
  description,
  dueDate,
  completed,
  priority,
  id,
) {
  const taskCard = document.createElement("div");
  taskCard.setAttribute("class", "task-card");
  taskCard.setAttribute("item-id", id);

  const titleHeader = document.createElement("h2");
  titleHeader.textContent = title;

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = description;

  const completedInfo = document.createElement("p");
  completedInfo.textContent = completed;

  const priorityInfo = document.createElement("p");
  priorityInfo.textContent = priority;

  const timeToFinishTaskInfo = document.createElement("p");
  timeToFinishTaskInfo.textContent = dueDate;

  const deleteButton = document.createElement("div");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("click-action", "deleteTask");
  deleteButton.setAttribute("item-id", id);

  taskCard.appendChild(titleHeader);
  taskCard.appendChild(descriptionParagraph);
  taskCard.appendChild(completedInfo);
  taskCard.appendChild(priorityInfo);
  taskCard.appendChild(timeToFinishTaskInfo);
  taskCard.appendChild(deleteButton);

  return taskCard;
}

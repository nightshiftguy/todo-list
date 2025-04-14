import { formatDistanceToNow } from "date-fns";

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

  const priorityInfo = document.createElement("p");
  priorityInfo.textContent = priority;

  const timeToFinishTaskInfo = document.createElement("p");
  if(completed){
    timeToFinishTaskInfo.textContent = "completed";
  }
  else{
    if(dueDate.getTime()>new Date().getTime()){
      timeToFinishTaskInfo.textContent = "Due in " + formatDistanceToNow(dueDate);
    } else {
      timeToFinishTaskInfo.textContent = "Overdue for "+formatDistanceToNow(dueDate);
    }
  }

  const deleteButton = document.createElement("div");
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("click-action", "deleteTask");
  deleteButton.setAttribute("item-id", id);

  deleteButton.addEventListener("click",()=>{
    const deleteEvent = new CustomEvent("delete",{
      bubbles: true,
      detail:{itemToDelete:"task", id}
    });
    deleteButton.dispatchEvent(deleteEvent);
  })

  taskCard.appendChild(titleHeader);
  taskCard.appendChild(descriptionParagraph);
  taskCard.appendChild(priorityInfo);
  taskCard.appendChild(timeToFinishTaskInfo);
  taskCard.appendChild(deleteButton);

  return taskCard;
}

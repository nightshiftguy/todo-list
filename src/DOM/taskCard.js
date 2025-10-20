import { formatDistanceToNow } from "date-fns";
import deleteIconSrc from "../icons/delete.svg";

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

  const taskDetails = document.createElement("div");
  taskDetails.setAttribute("class","task-details");

    const descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = "description: " + description;

    const priorityInfo = document.createElement("p");
    priorityInfo.textContent = "priority: "+ priority;

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
    const deleteIcon = document.createElement("img");
    deleteIcon.src = deleteIconSrc;
  deleteButton.appendChild(deleteIcon);
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
    taskDetails.appendChild(descriptionParagraph);
    taskDetails.appendChild(priorityInfo);
    taskDetails.appendChild(timeToFinishTaskInfo);
  taskCard.appendChild(taskDetails)
  taskCard.appendChild(deleteButton);

  return taskCard;
}

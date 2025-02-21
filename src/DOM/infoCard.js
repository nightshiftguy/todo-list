export default function createInfoCard(info){
    const infoCard = document.createElement("div");
    infoCard.setAttribute("class","info-card");

    const infoCardText = document.createElement("p");
    infoCardText.textContent = info;

    infoCard.appendChild(infoCardText);
    return infoCard;
}
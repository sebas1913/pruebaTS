import { IPost } from "../models/Iposts";
import { PostController } from "./posts.controllers";

export const Card = (props: IPost): HTMLElement => {
    let { id, title, body, creationDate, estimatedPublicationDate, status, approvalPercentage, corrections, platform, multimediaUrl, creator } = props;
    const cardContainer = document.createElement("article") as HTMLElement;
    cardContainer.className = "card-container";

    const img = document.createElement("img") as HTMLImageElement;
    img.className = "img-card";

    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "cardInfo-container";

    const cardTitle = document.createElement("h2") as HTMLHeadElement;
    cardTitle.className = "card-title";
    const cardPlatform = document.createElement("p") as HTMLParagraphElement;
    const cardDescription = document.createElement("p") as HTMLParagraphElement;
    const cardCreationDate = document.createElement("p") as HTMLParagraphElement;
    const cardEstimatedPublicationDate = document.createElement("p") as HTMLParagraphElement;
    const cardStatus = document.createElement("p") as HTMLParagraphElement;
    const cardApproval = document.createElement("p") as HTMLParagraphElement;
    const cardCorrections = document.createElement("p") as HTMLParagraphElement;

    // Convertir las fechas a objetos Date si son strings
    const creationDateObj = new Date(creationDate);
    const estimatedPublicationDateObj = new Date(estimatedPublicationDate);

    img.src = multimediaUrl;
    cardTitle.innerText = title;
    cardPlatform.innerText = `Plataforma: ${platform}`;
    cardDescription.innerText = body;
    cardCreationDate.innerText = `Fecha de creación: ${creationDateObj.toLocaleDateString()}`;
    cardEstimatedPublicationDate.innerText = `Fecha estimada: ${estimatedPublicationDateObj.toLocaleDateString()}`; 
    cardStatus.innerText = `Estado: ${status}`;
    cardApproval.innerText = `Porcentaje de aprobación: ${approvalPercentage.toString()}`;
    cardCorrections.innerText = corrections;

    const updateButton = document.createElement("button");
    updateButton.innerText = "Actualizar";
    updateButton.className = "update-button";
    updateButton.addEventListener("click", () => {
        // Actualiza los valores del formulario
        (document.querySelector("#new-post") as HTMLInputElement).value = title;
        (document.querySelector("#new-description") as HTMLInputElement).value = body;
        (document.querySelector("#new-img") as HTMLInputElement).value = multimediaUrl;
        (document.querySelector("#new-app") as HTMLInputElement).value = platform;
        (document.querySelector("#new-postUrl") as HTMLInputElement).value = props.postUrl || '';
        (document.querySelector("#new-creationDate") as HTMLInputElement).value = creationDateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        (document.querySelector("#new-estimatedPublicationDate") as HTMLInputElement).value = estimatedPublicationDateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        (document.querySelector("#new-status") as HTMLInputElement).value = status;
        (document.querySelector("#new-approvalPercentage") as HTMLInputElement).value = approvalPercentage.toString();
        (document.querySelector("#new-corrections") as HTMLInputElement).value = corrections;


        // Almacena el ID del post para actualizar
        const postIdInput = document.querySelector("#post-id") as HTMLInputElement;
        if (postIdInput) {
            postIdInput.value = String(id); // Convertimos el id a string
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Eliminar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", async () => {
        const url: string = 'https://api-posts.codificando.xyz';
        const confirmDelete = confirm('¿Deseas eliminar?');
        if (confirmDelete) {
            try {
                const postController = new PostController(url);
                await postController.deletePost(`${url}`, `posts/${id}`);
                console.log(`Post ${id} eliminado.`);
                cardContainer.remove();
            } catch (error) {
                console.error("Error al eliminar el post:", error);
            }
        }
    });

    infoContainer.append(cardTitle, cardDescription, cardCreationDate, cardEstimatedPublicationDate, cardStatus, cardApproval, cardCorrections, cardPlatform,  updateButton, deleteButton);
    cardContainer.append(img, infoContainer);

    return cardContainer;
};

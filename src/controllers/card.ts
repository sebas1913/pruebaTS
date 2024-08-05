import { IPost } from "../models/Iposts";
import { PostController } from "./posts.controllers";

export const Card = (props: IPost): HTMLElement => {
    let { id, title, body, platform, multimediaUrl } = props;
    const cardContainer = document.createElement("article") as HTMLElement;
    cardContainer.className = "card-container";

    const img = document.createElement("img") as HTMLImageElement;
    img.className = "img-card";

    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "cardInfo-container";

    const cardTitle = document.createElement("h3") as HTMLHeadElement;
    cardTitle.className = "card-title";
    const cardPlatform = document.createElement("p") as HTMLParagraphElement;
    const cardDescription = document.createElement("p") as HTMLParagraphElement;
    const cardTemperature = document.createElement("p") as HTMLParagraphElement;

    img.src = multimediaUrl;
    cardTitle.innerText = title;
    cardPlatform.innerText = platform;
    cardDescription.innerText = body;

    const updateButton = document.createElement("button");
    updateButton.innerText = "Actualizar";
    updateButton.className = "update-button";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Actualizar";
    deleteButton.className = "delete-button";

    updateButton.addEventListener("click", () => {
        
        // Actualiza los valores del formulario
        (document.querySelector("#new-post") as HTMLInputElement).value = title;
        (document.querySelector("#new-description") as HTMLInputElement).value = body;
        (document.querySelector("#new-img") as HTMLInputElement).value = multimediaUrl;
        (document.querySelector("#new-app") as HTMLTextAreaElement).value = platform;
        
        // Almacena el ID de la ciudad para actualizar
        const postIdInput = document.querySelector("#post-id") as HTMLInputElement;
        if (postIdInput) {
            postIdInput.value = String(id); // Convertimos el id a string
        }
    });

    deleteButton.addEventListener("click", async () => {
        const eliminar = confirm('¿Deseas eliminar?');
        if (eliminar) {
            try {
                const citiesController = new PostController('https://api-posts.codificando.xyz/');
                await citiesController.deleteCities(`posts/${id}`);
                cardContainer.remove();
            } catch (error) {
                console.error("Error al eliminar la ciudad:", error);
            }
        }
    });

    infoContainer.append(cardTitle, cardDescription, cardTemperature, updateButton, deleteButton);
    cardContainer.append(img, infoContainer);

    return cardContainer;
};

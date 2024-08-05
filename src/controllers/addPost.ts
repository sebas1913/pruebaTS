// Este archivo maneja la funcionalidad de añadir o actualizar ciudades en un archivo JSON

import { IPost } from "../models/Iposts"; // Importamos la interfaz ICity para tipar los datos de la ciudad
import { PostController } from "./posts.controllers"; // Importamos el controlador CitiesController para manejar las operaciones CRUD de las ciudades

// Obtenemos referencias a los elementos del formulario
const form = document.querySelector("#addPost-form") as HTMLFormElement;
const title = document.querySelector("#new-post") as HTMLInputElement;
const description = document.querySelector("#new-description") as HTMLInputElement;
const image = document.querySelector("#new-img") as HTMLInputElement;
const platform = document.querySelector("#new-app") as HTMLTextAreaElement;
const postIdInput = document.querySelector("#post-id") as HTMLInputElement;

// Definimos las variables necesarias
const citiesController = new PostController('https://api-posts.codificando.xyz/'); 
const endPoint: string = 'posts/'; // Endpoint donde se envían las peticiones para agregar o actualizar 

// Añadimos un listener para el evento de envío del formulario
form.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

    // Extraemos los valores de los campos del formulario
    const titleName = title.value;
    const descriptionName = description.value;
    const imageName = image.value;
    const platformName = platform.value;
    const postId = postIdInput.value; // Si se especifica un ID, se usará para actualizar la ciudad existente

    try { 
        // Creamos un objeto IPost con los datos del formulario
        const cityData: IPost = {
            title: titleName,
            body: descriptionName,
            multimediaUrl: imageName,
            platform: platformName,
        };

        if (postId) {
            // Si se ha proporcionado un ID, actualizamos post existente
            await citiesController.updatePost(postId, endPoint, cityData);
            alert("Publicación actualizada"); // Alerta de confirmación
        } else {
            // Si no hay ID, agregamos una nueva ciudad
            await citiesController.postPost(endPoint, cityData);
            alert("Publicación agregado"); // Alerta de confirmación
        }

        // Reseteamos el formulario
        form.reset();

        // Redirigimos a la página de inicio para mostrar los cambios
        window.location.href = "home.html";
    } catch (error) {
        console.error("Error al agregar o actualizar el post:", error); // Manejo de errores
    }
});

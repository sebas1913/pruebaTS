import { IPost } from "../models/Iposts"; // Importamos la interfaz IPost para tipar los datos de la publicación
import { PostController } from "./posts.controllers"; // Importamos el controlador PostController para manejar las operaciones CRUD de las publicaciones

// Obtenemos referencias a los elementos del formulario
const form = document.querySelector("#addPost-form") as HTMLFormElement;

// Definimos las variables necesarias
const postController = new PostController('https://api-posts.codificando.xyz/'); 
const endPoint: string = 'posts'; // Endpoint donde se envían las peticiones para agregar o actualizar 

form.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const titleName = (document.querySelector("#new-post") as HTMLInputElement).value;
    const descriptionName = (document.querySelector("#new-description") as HTMLInputElement).value;
    const imageName = (document.querySelector("#new-img") as HTMLInputElement).value;
    const platformName = (document.querySelector("#new-app") as HTMLInputElement).value;
    const postUrl = (document.querySelector("#new-postUrl") as HTMLInputElement).value;
    const creationDate = new Date((document.querySelector("#new-creationDate") as HTMLInputElement).value);
    const estimatedPublicationDate = new Date((document.querySelector("#new-estimatedPublicationDate") as HTMLInputElement).value);    
    const status = (document.querySelector("#new-status") as HTMLInputElement).value;
    const approvalPercentage = Number((document.querySelector("#new-approvalPercentage") as HTMLInputElement).value);
    const corrections = (document.querySelector("#new-corrections") as HTMLInputElement).value;
    const postId = Number((document.querySelector("#post-id") as HTMLInputElement).value);

    const postData: IPost = {
        title: titleName,
        body: descriptionName,
        multimediaUrl: imageName,
        platform: platformName,  // Asegúrate de que este valor sea uno de los esperados por la API
        postUrl: postUrl,
        creator: sessionStorage.getItem('userEmail') || "", // Debe ser una cadena (email)
        creationDate: creationDate,
        estimatedPublicationDate: estimatedPublicationDate,
        status: status,  // Asegúrate de que este valor sea uno de los esperados por la API
        approvalPercentage: approvalPercentage,
        corrections: corrections,
    };

    try {
        if (postId) {
            // Orden correcto: endPoint primero, postId segundo
            await postController.updatePost(endPoint, postId.toString(), postData);
            alert("Publicación actualizada");
        } else {
            await postController.postPost(endPoint, postData);
            alert("Publicación añadida");
        }

        // form.reset();
    } catch (error) {
        console.error("Error al agregar o actualizar el post:", error);
    }
});

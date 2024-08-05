import { IPost } from "../models/Iposts";

export class PostController {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getPost(): Promise<IPost> {
        const response = await fetch(`${this.url}`);
        const data = await response.json();
        console.log(response.status);

        return data;
    }

    async postPost(endPoint: string, dataPost: IPost) {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
        });

        console.log(response);

        if (response.status !== 200) {
            throw new Error(`No se puede publicar`);
        }

        const data = await response.json();
        return data;
    }

    async deletePost(url: string, id: string): Promise<void> {
        const response: Response = await fetch(`${url}/posts/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la ciudad: ${response.statusText}`);
        }

        console.log('Ciudad eliminada exitosamente');
    }


    async updatePost(id: string, endPoint: string, dataPost: IPost): Promise<IPost> {
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
        };

        const reqOptions: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(dataPost)
        };

        const response: Response = await fetch(`${this.url}${endPoint}${id}`, reqOptions);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Error al actualizar la ciudad: ${response.statusText}`);
        }

        const updatedPost: IPost = await response.json();
        return updatedPost;
    }
}

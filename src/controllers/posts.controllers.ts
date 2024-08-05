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

    async postPost(endPoint: string, dataCity: IPost) {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataCity)
        });

        console.log(response.status);

        if (response.status !== 201) {
            throw new Error(`No se puede publicar`);
        }

        const data = await response.json();
        return data;
    }

    async deleteCities(endPoint: string): Promise<IPost> {
        const headers: Record<string, string> = {
            "accept": "*/*",
        };
        const reqOptions: RequestInit = {
            method: "DELETE",
            headers: headers,
        };

        const response: Response = await fetch(`${this.url}${endPoint}`, reqOptions);

        if (!response.ok) {
            throw new Error(`Error al eliminar la ciudad: ${response.statusText}`);
        }

        const responseDelete: IPost = await response.json();
        return responseDelete;
    }

    async updateCities(id: string, endPoint: string, dataCity: IPost): Promise<IPost> {
        const headers: Record<string, string> = {
            "accept": "*/*",
            "Content-Type": "application/json",
        };

        const reqOptions: RequestInit = {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(dataCity)
        };

        const response: Response = await fetch(`${this.url}${endPoint}${id}`, reqOptions);
        console.log(response);
        

        if (!response.ok) {
            throw new Error(`Error al actualizar la ciudad: ${response.statusText}`);
        }

        const updatedCity: IPost = await response.json();
        return updatedCity;
    }
}

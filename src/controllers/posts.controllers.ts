// POST.CONTROLLER.TS
import { IPost } from "../models/Iposts";

export class PostController {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getHeaders() {
        const userEmail = sessionStorage.getItem('userEmail');
        return {
            'Content-Type': 'application/json',
            'x-user-email': userEmail || ''
        };
    }

    async getPost(): Promise<IPost[]> {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: this.getHeaders()
        });
        return response.json();
    }

    async postPost(endPoint: string, data: IPost): Promise<void> {
        try {
            const response = await fetch(`${this.url}${endPoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                // Puedes ajustar este mensaje según el error específico
                const errorText = await response.text();
                throw new Error(`Error al enviar el post: ${response.status} ${response.statusText} - ${errorText}`);
            }
    
            console.log('Post agregado exitosamente');
        } catch (error) {
            console.error('Error en postPost:', error);
        }
    }
    

    async updatePost(endPoint: string, postId: string, data: IPost): Promise<void> {
        await fetch(`${this.url}${endPoint}/${postId}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        });
    }
    

    async deletePost(endPoint: string, postId: string): Promise<void> {
        await fetch(`${endPoint}/${postId}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        });
    }
}

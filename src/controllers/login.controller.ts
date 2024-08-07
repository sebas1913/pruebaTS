//Creamos el archivo page.controller, que tiene como objetivo manejar el login
//Importamos la interfaces necesarias para el log in
import { ILogin, IResponseLogin } from "../models/Ilogin";


//Creamos la clase PageController, que tendrá la funcionalidad del log in
export class UserLogin {
    url : string;

    // Creamos el constructor y como parámetro la URL base para las peticiones
    constructor(url : string) {
        this.url = url;
    }


    //Método asíncrónico para el inicio de sesión
    //Recibe los datos de inicio de sesión (data) y el endpoint
    async login(data : ILogin) : Promise<IResponseLogin> { 
        const response = await fetch(`${this.url}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify(data) //Acá convertimos el objeto data a JSON
        });

        //Manejo de errores 
        //Si la respuesta es diferente de 201, arrojamos el error
        if (response.status != 201) {
            throw new Error('no se pudo iniciar sesión');
        }

        const responseData: IResponseLogin = await response.json();

        // Almacena el correo del usuario en sessionStorage
        sessionStorage.setItem('userEmail', data.email);

        return responseData;
    }
}
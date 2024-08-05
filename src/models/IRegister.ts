export interface IUserRegister { // se crea la interface para realizar la estructura del objeto que se envía al json-server por medio de la petición 'POST'.
    email : string,
    password : string
}

export interface IUserVerification {
    email : string,
    password : string,
}


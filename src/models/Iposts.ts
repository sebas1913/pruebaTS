export interface IPost {
    id?: number,
    title: string;
    body: string;
    creationDate: Date;
    estimatedPublicationDate: Date;
    status: string;
    approvalPercentage: number;
    corrections: string;
    platform: string;
    postUrl: string;
    multimediaUrl: string;
    creator: string; // Se espera que sea una cadena (correo electrónico del usuario)
}


export interface Creator {
    id:       number;
    email:    string;
    password: string;
}

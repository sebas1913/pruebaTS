export interface IPost {
    // postByUser:               number;
    title:                    string;
    body:                     string;
    // creationDate:             Date;
    // estimatedPublicationDate: Date;
    // status:                   string;
    // approvalPercentage:       number;
    // corrections:              string;
    platform:                 string;
    // postUrl:                  string;
    multimediaUrl:            string;
    // creator:                  Creator;
    id?:                       number;
    // deletedAt:                null;
}

export interface Creator {
    id:       number;
    email:    string;
    password: string;
}

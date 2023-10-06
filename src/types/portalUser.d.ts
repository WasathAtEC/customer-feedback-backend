export interface ITransformedPortalUser extends IPortalUserInputDTO {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPortalUserInputDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    role: string;
}

export interface ILoginData {
    email: string;
    password: string;
} 

export interface IJwtToken {
    email: string;
    userId: string;
    role: string;
    company: string;
}

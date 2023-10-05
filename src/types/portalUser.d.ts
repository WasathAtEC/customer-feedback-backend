export interface IPortalUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
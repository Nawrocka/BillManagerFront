export interface IResponseAfterLogin {
    code: number;
    message: string;
    status: string;
    isAdmin: boolean;
    idUser: string;
    email: string;
}

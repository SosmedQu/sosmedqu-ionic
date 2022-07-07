import jwt_decode from 'jwt-decode'
import { getCookie } from 'typescript-cookie';

export interface IDataToken {
    userId: number
    username: string
    studyAt: string
    role: string
    email: string
    iat: number
}

export function getdataToken() {
    const data: IDataToken = jwt_decode(getCookie("accessToken") as string)
    return data;
}
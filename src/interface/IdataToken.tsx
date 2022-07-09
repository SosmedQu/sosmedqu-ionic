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
    const token = getCookie("accessToken");
    if (token) {
        const data: IDataToken = jwt_decode(token || '')
        return data ?? null;
    }
}
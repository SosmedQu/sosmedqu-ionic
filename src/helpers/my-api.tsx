import Axios from 'axios';
import { useHistory } from 'react-router';
const api = Axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true
})
export class MyApi {
    constructor() {

    }

    register = async (data: any) => {
        const req = await api.post('/auth/register', data);
        return req;
    }

    verifyEmail = async (data: any) => {
        const req = await api.post('/auth/verifyAccount', data);
        return req;
    }

    createPassword = async (data: any) => {
        const req = await api.post('/auth/createPassword', data);
        return req;
    }

    login = async (data: any) => {
        const req = await api.post('/auth/login', data);
        return req;
    }

    logout = async () => {
        const req = await api.post("/auth/logout")
        return req;
    }

    getProfile = async () => {
        const req = await api.get('/profile');
        return req;
    }

    uploadPost = async (data: any) => {
        const req = await api.post('/posts', data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    getAllPost = async () => {
        const req = await api.get('/posts')
        return req;
    }
}

export default MyApi;
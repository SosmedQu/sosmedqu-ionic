import Axios from 'axios';
import { useHistory } from 'react-router';
import Env from './env';
const api = Axios.create({
    baseURL: `http://${Env.HOST}:${Env.PORT}/api`,
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

    getAllPostByUser = async (id: any) => {
        return await api.get(`/profile/posts/${id}`)
    }

    uploadPost = async (data: any) => {
        const req = await api.post('/posts', data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    getAllPost = async () => {
        return await api.get('/posts');
    }


    getOnePost = async (id: any) => {
        const req = await api.get(`/posts/edit/${id}`);
        return req;
    }

    deletePost = async (id: any) => {
        const req = await api.delete(`/posts/${id}`);
        return req;
    }

}

export default MyApi;
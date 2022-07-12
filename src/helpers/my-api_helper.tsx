import Axios from 'axios';
import { useHistory } from 'react-router';
import Env from './env_helper';
const api = Axios.create({
    baseURL: `http://${Env.URLAPI}/api`,
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

    // Profile
    getProfile = async () => {
        const req = await api.get('/profile');
        return req;
    }
    getProfileById = async (id: any) => {
        const req = await api.get(`/profile/${id}`);
        return req;
    }

    updateProfile = async (data: any) => {
        const req = await api.put("/profile/general", data, { headers: { "Content-Type": "multipart/form-data" } })
        return req;
    }

    upgradeStudent = async (data: any) => {
        const req = await api.post("/profile/validateStudent", data)
        return req;
    }

    // end of Profile

    // Post
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
        const req = await api.get(`/posts/${id}`);
        return req;
    }

    updatePost = async (data: any) => {
        const req = await api.put(`/posts`, data);
        return req;
    }

    deletePost = async (id: any) => {
        const req = await api.delete(`/posts/${id}`);
        return req;
    }

    // End Of Post

    // Post category
    getAllpostCategory = async () => {
        return await api.get("/postCategory");
    }
    getPostCategoryById = async (id: any) => {
        const req = await api.get(`/postCategory/${id}`)
    }

    uploadPostCategory = async (data: any) => {
        const req = await api.post("/postCategory", data);
        return req;
    }

    updatePostCategory = async (data: any) => {
        const req = await api.put("/postCategory", data);
        return req;
    }

    deletePostcategory = async (id: any) => {
        const req = await api.delete(`/postCategory/${id}`);
        return req;
    }
    // End of Post Category


    // Ebook
    uploadEbook = async (data: any) => {
        const req = await api.post("/ebooks", data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    getEbooks = async () => {
        const req = await api.get("/ebooks");
        return req;
    }

    getMyEbooks = async (id: any) => {
        const req = await api.get(`/profile/ebooks/${id}`)
        return req;
    }

    getEbookById = async (id: any) => {
        const req = await api.get(`/ebooks/${id}`);
        return req
    }

    updateEbook = async (data: any) => {
        const req = await api.put("/ebooks", data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    deleteEbook = async (id: any) => {
        const req = await api.delete(`/ebooks/${id}`);
        return req
    }

    // End Of Ebooks


    // Ebook Category
    getEbookCategory = async () => {
        const req = await api.get("/ebookCategory");
        return req;
    }

    getEbookCategoryById = async (id: any) => {
        const req = await api.get(`/ebookCategory/${id}`)
    }

    uploadEbookCategory = async (data: any) => {
        const req = await api.post("/ebookCategory", data);
        return req;
    }

    updateEbookCategory = async (data: any) => {
        const req = await api.put("/ebookCategory", data);
        return req;
    }

    deleteEbookcategory = async (id: any) => {
        const req = await api.delete(`/ebookCategory/${id}`);
        return req;
    }
    // End Of Ebook Category

    // Subject / Lesson_timeTable
    uploadSubject = async (data: any) => {
        const req = await api.post("/subjects", data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    getESubject = async () => {
        const req = await api.get("/subjects");
        return req;
    }

    getSubjectById = async (id: any) => {
        const req = await api.get(`/subjects/${id}`);
        return req
    }

    updateSubject = async (data: any) => {
        const req = await api.put("/subjects", data, { headers: { "Content-Type": "multipart/form-data" } });
        return req;
    }

    deleteSubject = async (id: any) => {
        const req = await api.delete(`/subjects/${id}`);
        return req
    }
    // End Of Subject

    // Follow   
    getAllFollowing = async (id: any) => {
        const req = await api.get(`following/${id}`)
    }
    getAllFollowers = async (id: any) => {
        const req = await api.get(`followers/${id}`)
    }
    follow = async (id: any) => {
        const req = await api.post(`following/${id}`)
    }
    unfollow = async (id: any) => {
        const req = await api.post(`unfollow/${id}`)
    }
    // End Of Follow


}

export default MyApi;
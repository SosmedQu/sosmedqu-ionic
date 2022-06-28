import Axios from 'axios';
const api = Axios.create({
    baseURL: `http://localhost:3000/api/`
})
export class MyApi {
    constructor() {

    }

    register = async (data: any) => {
        const req = await Axios.post('/auth/register', data);
        return req;
    }

    uploadPost = async (data: any) => {
        const req = await Axios.post('/auth/upload', data)
        return req;
    }
}

export default MyApi;
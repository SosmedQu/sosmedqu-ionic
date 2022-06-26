import Axios from 'axios';
const api = Axios.create({
    baseURL: `http://localhost:3000/api/`
})
export class MyApi {
    constructor() {

    }

    register = async (data: Object) => {
        const req = await Axios.post('/auth/register', JSON.stringify(data));
        return req;
    }
}

export default MyApi;
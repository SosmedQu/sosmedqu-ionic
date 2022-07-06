import Env from "./env_helper";

const AssetsApi = {
    "URLImgPost": encodeURI(`http://${Env.URLAPI}/images/posts`),
    "URLImgProfile": encodeURI(`http://${Env.URLAPI}/images/profiles`),
}

export default AssetsApi;
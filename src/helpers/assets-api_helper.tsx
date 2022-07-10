import Env from "./env_helper";

const AssetsApi = {
    URLImgPost: encodeURI(`http://${Env.URLAPI}/images/posts`),
    URLImgProfile: encodeURI(`http://${Env.URLAPI}/images/profiles`),
    URLImgEbooks: encodeURI(`http://${Env.URLAPI}/ebooks/images`),
    URLFileEbooks: encodeURI(`http://${Env.URLAPI}/ebooks/files`),
}

export default AssetsApi;
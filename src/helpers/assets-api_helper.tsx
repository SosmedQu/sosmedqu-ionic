import Env from "./env_helper";

const AssetsApi = {
    URLImgPost: encodeURI(`http://${Env.URLAPI}/images/posts`),
    URLImgProfile: encodeURI(`http://${Env.URLAPI}/images/profiles`),
    URLImgSubject: encodeURI(`http://${Env.URLAPI}/images/subjects`),
    URLImgEbooks: encodeURI(`http://${Env.URLAPI}/ebooks/images`),
    URLFileEbooks: encodeURI(`http://${Env.URLAPI}/ebooks/files`),
}

export default AssetsApi;
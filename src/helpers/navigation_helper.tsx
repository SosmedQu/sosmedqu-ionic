import Env from "./env_helper";

function navigate(path: string) {
    window.location.href = `http://${Env.URLWEB}/${path}`
}

export { navigate };
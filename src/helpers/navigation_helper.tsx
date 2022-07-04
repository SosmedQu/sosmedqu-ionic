import Env from "./env";

function navigate(path: string) {
    window.location.href = `http://${Env.HOSTWEB}:${Env.PORTWEB}${path}`
}

export { navigate };
import { useState } from "react";
import IAlert from "../../../interface/IAlert";

interface GenerateAlert {
    msg: string;
    okClick: () => void;
}

const Alert2 = () => {
    const [alert, setAlert] = useState<IAlert>({
        showAlert: false
    });
    const setAlertSuccess = (response: GenerateAlert) => {
        setAlert({
            showAlert: true,
            header: "Berhasil",
            message: response.msg,
            okClick: response.okClick,
            onDidDismiss: () => { setAlert({ showAlert: false }) },
            type: 'success'
        })
    }
    const setAlertFail = (response: GenerateAlert) => {
        setAlert({
            showAlert: true,
            header: "Opss...!",
            message: response.msg,
            onDidDismiss: () => { setAlert({ showAlert: false }) },
            type: 'failed'
        })
    }

    return {
        alert,
        setAlertSuccess,
        setAlertFail
    }
}

export default Alert2;
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { IonContent, IonPage, NavContext } from '@ionic/react';
import IAlert from '../interface/IAlert';
import { AlertOk } from './Alert';

const VerifyAccount: React.FC = () => {
    const { navigate } = useContext(NavContext);

    // Call this function when required to redirect with the back animation
    const redirect = useCallback(
        (url: string) => navigate(url, 'back'),
        [navigate]
    );
    const [Alert, setAlert] = useState<IAlert>({ showAlert: false });
    const url = "http://localhost:3000/api/auth/verifyAccount";
    const urlParams = new URLSearchParams(window.location.search);
    Axios.post(url, {
        "token": urlParams.get("token"), "email": urlParams.get("email")
    }).then((res) => {
        if (res.status == 200) {
            setAlert({
                type: "success",
                showAlert: true,
                header: "Berhasil",
                message: res.data.msg,
                okClick: () => {
                    redirect("/register/create-password")
                }
            });
        }
    }).catch(error => {
        setAlert({
            type: "failed",
            showAlert: true,
            header: "Gagal",
            message: error.response.msg
        });
    })
    return (
        <IonPage>
            <IonContent>
                <AlertOk
                    data={Alert}
                />
            </IonContent>
        </IonPage>
    )


}

export default VerifyAccount;
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { IonContent, IonPage, NavContext } from '@ionic/react';
import MyAlert from './Alert';

const VerifyAccount: React.FC = () => {
    const { navigate } = useContext(NavContext);

    // Call this function when required to redirect with the back animation
    const redirect = useCallback(
        (url: string) => navigate(url, 'back'),
        [navigate]
    );
    interface IAlert {
        type: string
        show: boolean
        msg: string
    }const [Alert, setAlert] = useState<IAlert>(
        {
            type: "success",
            show: false,
            msg: ""
        }
    );
    const url = "http://localhost:3000/api/auth/verifyAccount";
    const urlParams = new URLSearchParams(window.location.search);
    Axios.post(url, {
        "token": urlParams.get("token"), "email": urlParams.get("email")
    }).then((res) => {
        if (res.status == 200) {
            setAlert({
                type: "success",
                show: true,
                msg: res.data.msg
            });
            redirect("/register/create-password");
        }
    }).catch(error => {
        setAlert({
            type: "gagal",
            show: true,
            msg: error
        });
    })
    return (
        <IonPage>
            <IonContent>
                <MyAlert
                    showAlert={Alert?.show}
                    type={Alert?.type}
                    message={Alert.msg}
                />
            </IonContent>
        </IonPage>
    )


}

export default VerifyAccount;
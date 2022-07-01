import { IonAlert, IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { logInSharp } from 'ionicons/icons';
import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import MyApi from '../../helpers/my-api';
import './auth.css';
const LoginWithEmail: React.FC = () => {
    const history = useHistory();
    interface IAlert {
        type: string;
        show: boolean;
        header: string;
        msg: string;
        buttons: any;
    }
    const [Alert, setAlert] = useState<IAlert>({
        type: "",
        show: false,
        msg: "",
        header: "",
        buttons: undefined,
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e: any) => {
        e.preventDefault();
        const api = new MyApi();
        api.login({ email: email, password: password }).then(
            (response) => {
                console.log(response);
                setAlert({
                    type: "success",
                    show: true,
                    header: "Berhasil",
                    msg: response.data.msg,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.push("/profile")
                            },
                        },
                    ],
                });
            },
            (err) => {
                console.log(err.response)
                setAlert({
                    type: "failed",
                    header: "Gagal",
                    show: true,
                    msg: err.response.data.errors[0].msg,
                    buttons: [
                        {
                            text: "OK",
                        },
                    ],
                });
            }
        );
    }
    const resetAlert = () => {
        setAlert({
            type: "",
            show: false,
            msg: "",
            header: "",
            buttons: undefined,
        });
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login With Email</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login With Email</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <IonAlert isOpen={Alert.show} header={Alert.header} cssClass={"text-center alert-" + Alert.type} message={Alert.msg} buttons={Alert.buttons} onDidDismiss={() => resetAlert()} />
                    <IonRow>
                        <IonCol className="flex-center">
                            <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="logo-size-1" />
                        </IonCol>
                    </IonRow>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput type="email" name="email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput type='password' name="password" onIonChange={(e) => setPassword(e.detail.value!)} ></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <IonButton type="submit" color="light" style={{ "margin-bottom": "16px" }}>
                                <IonIcon icon={logInSharp} slot="start"></IonIcon>
                                <IonLabel>Login</IonLabel>
                            </IonButton>
                            <p>Don't have any account? <Link to="/register"><b>Register</b></Link></p>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginWithEmail;
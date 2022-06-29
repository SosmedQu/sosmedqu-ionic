import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { logInSharp } from 'ionicons/icons';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
                setAlert({
                    type: "success",
                    show: true,
                    header: "Berhasil",
                    msg: response.data.msg,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.push({
                                    pathname: "/profile",
                                    state: email,
                                });
                            },
                        },
                    ],
                });
            },
            (err) => {
                setAlert({
                    type: "failed",
                    header: "Gagal",
                    show: true,
                    msg: err.response.data.errors[0].msg,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                console.log("Test Success");
                            },
                        },
                    ],
                });
            }
        );
    }
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
                    <IonRow>
                        <IonCol className="flex-center">
                            <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="logo-size-1" />
                        </IonCol>
                    </IonRow>
                    <form action="">
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
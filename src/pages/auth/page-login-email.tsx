import { IonAlert, IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { logInSharp } from 'ionicons/icons';
import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { AlertOk } from '../../components/Alert';
import { Loading } from '../../components/Utils/style/loading';
import MyApi from '../../helpers/my-api_helper';
import IAlert from '../../interface/IAlert';
import './auth.css';
const LoginWithEmail: React.FC = () => {
    const history = useHistory();
    const [Alert, setAlert] = useState<IAlert>({ showAlert: false })
    const [showLoading, setShowLoading] = useState(false);

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
                    showAlert: true,
                    header: "Berhasil",
                    message: response.data.msg,
                    okClick: () => {
                        history.push("/profile")
                    },
                    onDidDismiss() {
                        setAlert({ showAlert: false })
                    },
                });
            },
            (err) => {
                console.log(err.response)
                setAlert({
                    type: "failed",
                    showAlert: true,
                    header: "Gagal",
                    message: err.response.data.msg,
                    okClick: () => {

                    },
                    onDidDismiss() {
                        setAlert({ showAlert: false })
                    },
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
                    <Loading
                        cssClass='loading-post'
                        isOpen={showLoading}
                        spinner={'lines'}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                    />
                    <AlertOk data={Alert} />
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
                            <IonButton type="submit" color="light" style={{ marginBottom: "16px" }}>
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
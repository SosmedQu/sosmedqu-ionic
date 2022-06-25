import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { logInSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './auth.css';
const LoginWithEmail: React.FC = () => {
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
                            <IonInput type="email" name="email"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput type='password' name="password"></IonInput>
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
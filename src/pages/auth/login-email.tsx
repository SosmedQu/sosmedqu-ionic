import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { atCircleSharp, logoAppleAr, logoFacebook, logoGoogle, mailSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './auth.css';

const LoginEmail: React.FC = () => {
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
                <div className="content-center">
                    <IonIcon icon={logoAppleAr} style={{ "font-size": "150px" }}></IonIcon>
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
                            <IonButton type="submit" color="success">Login</IonButton>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default LoginEmail;
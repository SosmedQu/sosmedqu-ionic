import { IonButton, IonContent, IonIcon, IonLabel } from '@ionic/react';
import { logoFacebook, logoGoogle, mailSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './auth.css';

const Login: React.FC = () => {
    return (
        <IonContent>
            <video loop muted autoPlay id="my-video">
                <source src={process.env.PUBLIC_URL + "/assets/video/video.mp4"} type="video/mp4" />
            </video>
            <div className="login-box">
                <IonButton expand="block" color="light" id='button'>
                    <IonIcon slot="start" icon={logoGoogle} />
                    <IonLabel>Login With Google</IonLabel>
                </IonButton>
                <IonButton expand="block" color="light" id='button' href="/loginEmail">
                    <IonIcon slot="start" icon={mailSharp} />
                    <IonLabel>Login With Email</IonLabel>
                </IonButton>
                <p>Don't have any account? <Link to="/register"><b>Register</b></Link></p>
            </div>
        </IonContent>
    )
}

export default Login;
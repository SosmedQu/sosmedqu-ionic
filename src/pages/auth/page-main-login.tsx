import { IonContent, IonButton, IonIcon, IonLabel, IonPage } from "@ionic/react"
import { logoGoogle, mailSharp } from "ionicons/icons"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <video loop muted autoPlay id="my-video">
                    <source src={process.env.PUBLIC_URL + "/assets/video/video2.mp4"} type="video/mp4" />
                </video>
                <div className="login-box">
                    <IonButton expand="block" color="light" id='button' href="/profile">
                        <IonIcon slot="start" icon={logoGoogle} />
                        <IonLabel>Login With Google</IonLabel>
                    </IonButton>
                    <IonButton expand="block" color="light" id='button' href="/login-email">
                        <IonIcon slot="start" icon={mailSharp} />
                        <IonLabel>Login With Email</IonLabel>
                    </IonButton>
                    <p>Don't have any account? <Link to="/register"><b>Register</b></Link></p>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;
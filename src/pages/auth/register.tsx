import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackCircleOutline, chevronForwardCircleOutline, logoAppleAr } from 'ionicons/icons';
import {BrowserHistory} from 'react-router';
import './auth.css';

const Register: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Registration Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="content-center">
                    <IonIcon icon={logoAppleAr} style={{ "font-size": "150px" }}></IonIcon>
                    <form action="/register/next">
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput type="email" name="email"></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <IonButton type="submit" color="light">
                                <IonIcon icon={chevronForwardCircleOutline} slot="start"></IonIcon>
                                <IonLabel>Next Step</IonLabel>
                            </IonButton>
                            <br></br>
                            <IonButton href="/login" color="light">
                                <IonIcon icon={chevronBackCircleOutline} slot="start"></IonIcon>
                                <IonLabel>Back</IonLabel>
                            </IonButton>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Register;
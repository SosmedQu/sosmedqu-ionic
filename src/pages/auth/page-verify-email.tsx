import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel } from "@ionic/react"
import { mailOutline, sendSharp, mailSharp } from "ionicons/icons"

const VerifikasiEmail: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Verifikasi Email</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Verifikasi Email</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <IonIcon icon={mailOutline} style={{ "font-size": "150px" }}></IonIcon>
                    <h1>Verify Your Email</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit ame venenatis, <a>Click Resend Verify</a></p>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonButton color="light">
                                    <IonIcon icon={sendSharp} slot="start"></IonIcon>
                                    <IonLabel>Resend Verify</IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="light" href="/register">
                                    <IonIcon icon={mailSharp} slot="start"></IonIcon>
                                    <IonLabel>Change Email</IonLabel>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default VerifikasiEmail;
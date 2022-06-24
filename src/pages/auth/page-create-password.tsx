import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react"
import { keySharp, saveSharp } from "ionicons/icons"
import Axios from 'axios';
import { useState } from "react";
import MyAlert from "../../components/Alert";
import { error } from "console";

const CreatePassword: React.FC = () => {
    return (
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
                <div className="container">
                    <IonIcon icon={keySharp} style={{ "font-size": "150px" }}></IonIcon>
                    <form action="/profile">
                        <IonItem>
                            <IonLabel position="floating">Your Name</IonLabel>
                            <IonInput type="text" name="name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">New Password</IonLabel>
                            <IonInput type="password" name="password"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Confirm Password</IonLabel>
                            <IonInput type="password" name="confirm-password"></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <IonButton type="submit" color="light">
                                <IonIcon icon={saveSharp} slot="start"></IonIcon>
                                <IonLabel>Save</IonLabel>
                            </IonButton>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default CreatePassword;
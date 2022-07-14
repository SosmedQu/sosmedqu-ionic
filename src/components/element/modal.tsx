import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonIcon } from "@ionic/react";
import { addSharp } from "ionicons/icons";
import { useRef, useState } from "react";

export const ModalCreateCategory = ({
    onDismiss,
}: {
    onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
    const inputRef = useRef<HTMLIonInputElement>(null);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                            Cancel
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Tambah Category</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => onDismiss(inputRef.current?.value, 'confirm')}>
                            <IonIcon icon={addSharp}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Nama category</IonLabel>
                    <IonInput ref={inputRef} placeholder="Masukan nama category" />
                </IonItem>
            </IonContent>
        </IonPage>
    );
};
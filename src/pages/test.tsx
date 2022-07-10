import React, { useState, useRef } from 'react';
import {
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    useIonModal,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import { ModalCreateCategory } from '../components/element/modal';

function Example() {
    const [present, dismiss] = useIonModal(ModalCreateCategory, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
    });
    const [message, setMessage] = useState('This modal example uses the modalController to present and dismiss modals.');

    function openModal() {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'confirm') {
                    setMessage(`Hello, ${ev.detail.data}!`);
                }
            },
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Controller Modal</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand="block" onClick={() => openModal()}>
                    Open
                </IonButton>
                <p>{message}</p>
            </IonContent>
        </IonPage>
    );
}

export default Example;
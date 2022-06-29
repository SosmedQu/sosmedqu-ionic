import { IonAlert } from '@ionic/react';
import { useState } from 'react';

interface AlertProps {
    showAlert: boolean
    header: string
    message: string
    type: string
}

const MyAlert: React.FC<AlertProps> = ({ showAlert, header, message, type }) => {
    return (
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => showAlert = false}
            cssClass={'text-center alert-' + type + ''}
            header={header}
            message={message}
            buttons={['OK']}
        />
    );
};

export default MyAlert;

import { IonAlert } from '@ionic/react';
import { useState } from 'react';

interface AlertProps {
    showAlert: boolean
    header: string
    message: string
    type: string
}

const MyAlert: React.FC<AlertProps> = ({ showAlert, header, message, type }) => {
    const [show, setShow] = useState(showAlert)
    if (type == 'success') {
        return (
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShow(false)}
                cssClass='text-center alert-success animate__animated animate__bounce'
                header={header}
                message={message}
                buttons={['OK']}
            />
        );
    }
    return (
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShow(false)}
            cssClass='text-center alert-failed'
            header={header}
            message={message}
            buttons={['OK']}
        />
    );
};

export default MyAlert;

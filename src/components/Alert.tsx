import { IonAlert } from '@ionic/react';
import styled from 'styled-components';
import IAlert from '../interface/IAlert';

const MyAlertOk = styled(IonAlert)`
    color: var(--ion-color-light) !important;
`;

const AlertOk: React.FC<{ data: IAlert }> = (props) => {
    return (
        <MyAlertOk
            isOpen={props.data.showAlert}
            cssClass={`custom-alert text-center alert-${props.data.type}`}
            onDidDismiss={props.data.onDidDismiss}
            backdropDismiss={false}
            header={props.data.header}
            message={props.data.message}
            buttons={[
                {
                    text: "OK",
                    handler: props.data.okClick
                }
            ]}
        />
    );
};

export { AlertOk };

import { IonAlert } from '@ionic/react';
import IAlert from '../interface/IAlert';

const AlertOk: React.FC<{ data: IAlert }> = (props) => {
    return (
        <IonAlert
            isOpen={props.data.showAlert}
            cssClass={'text-center alert-' + props.data.type + ''}
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

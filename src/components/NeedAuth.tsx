import { IonButton, IonIcon, IonLabel } from '@ionic/react';
import { logInSharp } from 'ionicons/icons';

interface ContainerProps {
    name: string;
}

const NeedAuth: React.FC<ContainerProps> = ({ name }) => {
    return (
        <div className="container">
            <strong>{name}</strong>
            <br></br>
            <IonButton href="/login" color="light">
                <IonIcon icon={logInSharp} size="large" slot="start"></IonIcon>
                <IonLabel>Login Page</IonLabel>
            </IonButton>
        </div>
    );
};

export default NeedAuth;

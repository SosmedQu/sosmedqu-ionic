import { IonHeader, IonToolbar } from '@ionic/react';
import { TopBar } from './menu/Menu';

const DefaultHeader: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar color={'primary'}>
                <TopBar />
            </IonToolbar>
        </IonHeader>
    )
}

export default DefaultHeader;
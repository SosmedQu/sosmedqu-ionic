import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const ShortVideo: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <ExploreContainer name="Short Video" />
            </IonContent>
        </IonPage>
    );
};

export default ShortVideo;

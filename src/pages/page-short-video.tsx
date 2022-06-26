import { IonContent, IonPage } from '@ionic/react';
import { PostShort } from '../components/post/Post';

const ShortVideo: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <PostShort />
            </IonContent>
        </IonPage>
    );
};

export default ShortVideo;

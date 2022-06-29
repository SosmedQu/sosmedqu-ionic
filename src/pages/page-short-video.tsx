import { IonContent, IonPage, IonSlide, IonSlides } from '@ionic/react';
import { PostShort } from '../components/post/Post';

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: 'vertical'
};

const ShortVideo: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonSlides options={slideOpts}>
                    <IonSlide style={{ height: '100%' }}>
                        <PostShort />
                    </IonSlide>
                    <IonSlide style={{ height: '100%' }}>
                        <PostShort />
                    </IonSlide>
                    <IonSlide>
                        <PostShort />
                    </IonSlide>
                </IonSlides>
            </IonContent>
        </IonPage>
    );
};

export default ShortVideo;

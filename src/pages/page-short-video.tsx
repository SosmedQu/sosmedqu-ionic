import { IonContent, IonPage, IonRefresher, IonRefresherContent, IonSlide, IonSlides, RefresherEventDetail } from '@ionic/react';
import { PostShort } from '../components/post/Post';

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    direction: 'vertical'
};


const ShortVideo: React.FC = () => {
    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        window.location.reload();
        event.detail.complete();
    }
    return (
        <IonPage>
            <IonContent fullscreen className='fixed-top'>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
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

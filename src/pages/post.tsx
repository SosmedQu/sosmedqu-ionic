import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderAndroid from '../components/HeaderAndroid';

const Post: React.FC = () => {
  return (
    <IonPage>
      <HeaderAndroid />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Postingan</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Postingan" />
      </IonContent>
    </IonPage>
  );
};

const PostText: React.FC = () => {
  return (
    <IonPage>
      <HeaderAndroid />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Postingan Text</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Postingan text" />
      </IonContent>
    </IonPage>
  );
};


export {Post, PostText};

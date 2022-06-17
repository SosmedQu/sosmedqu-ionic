import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import HeaderAndroid from '../components/HeaderAndroid';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <HeaderAndroid />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Home Page" />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

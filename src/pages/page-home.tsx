import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { SideBar, TopBar } from '../components/menu/Menu';
const HomePage: React.FC = () => {
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <TopBar />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Home Page</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Home Page" />
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;

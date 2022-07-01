import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FabAdd } from '../components/fab';
import DefaultHeader from '../components/header';
import { SideBar, TopBar } from '../components/menu/Menu';
import { } from '../components/post/Post';
const HomePage: React.FC = () => {
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <DefaultHeader />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
            </IonToolbar>
          </IonHeader>
          <FabAdd />
          <div className="content">

          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FabAdd } from '../components/fab';
import DefaultHeader from '../components/header';
import { SideBar, TopBar } from '../components/menu/Menu';
import { PostMedia, PostText } from '../components/post/Post';
const HomePage: React.FC = () => {
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <DefaultHeader />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Home Page</IonTitle>
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

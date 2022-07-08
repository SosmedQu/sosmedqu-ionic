import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { SideBar } from '../components/Menu';
import { } from '../components/post/Post';
import { Header } from '../components/Utils/style/header';
const HomePage: React.FC = () => {
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <Header>
        </Header>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
            </IonToolbar>
          </IonHeader>
          <div className="content">

          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;

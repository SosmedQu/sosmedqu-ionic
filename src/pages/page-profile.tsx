import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import { SideBar, TopBar } from '../components/menu/Menu';
import DefaultHeader from '../components/header';


const Profile: React.FC = () => {
  return (
    <>
      <SideBar />
      <IonPage>
        <IonHeader>
          <DefaultHeader />
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <NeedAuth name="Profile" />
        </IonContent>
      </IonPage>
    </>
  );

};

export default Profile;

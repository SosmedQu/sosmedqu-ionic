import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';


const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
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
  );
};

export default Profile;

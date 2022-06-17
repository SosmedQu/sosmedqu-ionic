import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import './main.css'
import HeaderAndroid from '../components/HeaderAndroid';


const Profile: React.FC = () => {
  return (
    <IonPage>
      <HeaderAndroid />
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

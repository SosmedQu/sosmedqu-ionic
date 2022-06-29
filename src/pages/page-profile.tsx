import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import { SideBar, TopBar } from '../components/menu/Menu';
import DefaultHeader from '../components/header';
import MyApi from '../helpers/my-api';


const Profile: React.FC = () => {
  const api = new MyApi();
  api.getProfile().then((profile) => {
    console.log(profile);
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
            <div className="container">
              <h1></h1>
            </div>
          </IonContent>
        </IonPage>
      </>
    );
  })
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

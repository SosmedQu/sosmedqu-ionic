import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import { SideBar, TopBar } from '../components/menu/Menu';
import DefaultHeader from '../components/header';
import MyApi from '../helpers/my-api';
import { useEffect, useState } from 'react';
import MyProfile from '../components/myprofile';

const Profile: React.FC = () => {
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    const api = new MyApi();
    const loadData = async () => {
      await api.getProfile().then((profile) => {
        setMyProfile(profile.data.user);
        console.log(profile.data.user);
      }, err => {
        console.log(err);
      }).catch((err) => {
        console.log(err);
      });
    }
    loadData();
  }, [])
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
          {Object.keys(myProfile).length > 0
            ? (
              <MyProfile data={myProfile} />
            )
            : <NeedAuth name='Profile' />}
        </IonContent>
      </IonPage>
    </>
  );

};

export default Profile;

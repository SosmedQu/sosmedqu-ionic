import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import { SideBar } from '../components/Menu';
import { ProfileHeader } from '../components/header';
import MyApi from '../helpers/my-api_helper';
import { useEffect, useRef, useState } from 'react';
import MyProfile from '../components/myprofile';
import { logoVimeo, newspaperOutline, ribbonSharp } from 'ionicons/icons';
import PostByUser from '../components/post/post-by-user';
import { Segment } from '../components/Utils/element/segment';
import { IconSM } from '../components/Utils/element/icon';

interface IProfile {
  id?: number;
  username?: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [myProfile, setMyProfile] = useState<IProfile>();
  const [value, setValue] = useState("0");
  const slider = useRef<HTMLIonSlidesElement>(null);
  const handleSegmentChange = (e: any) => {
    setValue(e.detail.value);
    slider.current!.slideTo(e.detail.value);
  };
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    pagination: {
      el: null
    },
  }
  const handleSlideChange = (e: any) => {
    slider.current?.getActiveIndex().then((e) => {
      setValue(`${e}`)
    })
  }
  useEffect(() => {
    const api = new MyApi();
    const loadData = async () => {
      await api.getProfile().then((profile) => {
        setMyProfile(profile.data.user);
      }, err => {
        console.log(err);
      }).catch((err) => {
        console.log(err);
      });
    }
    loadData();
  }, [])

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    window.location.reload();
    event.detail.complete();
  }
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <ProfileHeader />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {myProfile
            ? (
              <MyProfile data={myProfile} />
            )
            : <NeedAuth name='Profile' />}
          <Segment color="secondary" value={value} onIonChange={(e) => handleSegmentChange(e)}>
            <IonSegmentButton value="0">
              <IconSM icon={newspaperOutline} />
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IconSM icon={logoVimeo} />
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IconSM icon={ribbonSharp} />
            </IonSegmentButton>
          </Segment >
          <IonSlides options={slideOpts} ref={slider} onIonSlideDidChange={handleSlideChange}>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    {myProfile?.id &&
                      (<PostByUser idUser={myProfile.id} />)
                    }
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <h1>2</h1>
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <h1>3</h1>
                </IonRow>
              </IonGrid>
            </IonSlide>
          </IonSlides>
        </IonContent>
      </IonPage>
    </>
  );

};

export default Profile;

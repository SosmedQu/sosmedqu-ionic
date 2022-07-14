import { IonCol, IonContent, IonGrid, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentButton, IonSlide, IonSlides, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import NeedAuth from '../components/NeedAuth';
import { ActionSheetPost, SideBar } from '../components/Menu';
import MyApi from '../helpers/my-api_helper';
import { useEffect, useRef, useState } from 'react';
import MyProfile from '../components/myprofile';
import { addSharp, bookOutline, bookSharp, logoVimeo, newspaperOutline, pencil, ribbonSharp } from 'ionicons/icons';
import PostByUser from '../components/post/post-by-user';
import { Segment } from '../components/Utils/style/segment';
import { IconSM, IconToolbar } from '../components/Utils/style/icon';
import { ToolBarWithSideBar } from '../components/element/toolbar';
import { Header } from '../components/Utils/style/header';
import { useHistory } from 'react-router';
import { EbookCard } from '../components/ebook';
import { BoxError } from '../components/Utils/style/box-error';
import { getdataToken } from '../interface/IdataToken';

interface IProfile {
  id?: number;
  username?: string;
  email?: string;
  roleId: number
}

interface IEbook {
  id: number
  name: string
  fileName: string
  image: string
  writer: string
  publishing: string
  description: string
  isbn: number
  publicationYear: string
  userId: number
}

const Profile: React.FC = () => {
  // document.getElementById("tab-bar-bottom")?.classList.remove("d-none");
  const history = useHistory();
  const dataToken = getdataToken();
  const [myProfile, setMyProfile] = useState<IProfile>();
  const [followers, setFollowers] = useState<number>();
  const [following, setFollowing] = useState<number>();
  const [myEbook, setMyEbook] = useState<any>();
  const [value, setValue] = useState("0");
  const slider = useRef<HTMLIonSlidesElement>(null);
  const [actionPost, setActionPost] = useState(false);
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
  const api = new MyApi();
  useIonViewWillEnter(() => {
    const loadData = async () => {
      await api.getProfileById(dataToken?.userId).then((profile) => {
        setMyProfile(profile.data.user);
        setFollowers(parseInt(profile.data.follower[0].follower));
        setFollowing(profile.data.following[0].following);
        api.getMyEbooks(profile.data.user.id).then((res) => {
          setMyEbook(res.data.ebooks)
        })
      });
    }

    loadData();
  }, [])
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    window.location.reload();
    event.detail.complete();
  }

  function handleUpdate() {
    history.push("/student/update", myProfile)
  }
  console.log(myProfile)
  return (
    <>
      <SideBar />
      <IonPage id="main">
        <Header>
          <ToolBarWithSideBar>
            {myProfile && myProfile.roleId == 2 &&
              <IconToolbar onClick={() => setActionPost(true)} slot="end" icon={addSharp} />
            }
            <IconToolbar slot='end' onClick={handleUpdate} icon={pencil} />
          </ToolBarWithSideBar>
        </Header>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {myProfile &&
            <MyProfile data={myProfile} followers={followers} following={following} />}
          <Segment color="secondary" value={value} onIonChange={(e: any) => handleSegmentChange(e)}>
            <IonSegmentButton value="0">
              <IconSM icon={newspaperOutline} />
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IconSM icon={bookOutline} />
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IconSM icon={ribbonSharp} />
            </IonSegmentButton>
          </Segment >
          <IonSlides options={slideOpts} ref={slider} onIonSlideDidChange={handleSlideChange}>
            <IonSlide>
              <IonGrid>
                <ActionSheetPost show={actionPost} onDidDismiss={() => setActionPost(false)} />
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
                  {myEbook && myEbook.map((val: any, i: any) => (
                    <IonCol size='6' key={i}>
                      <EbookCard data={val} />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <BoxError>Anda belum memiliki prestasi</BoxError>
            </IonSlide>
          </IonSlides>
        </IonContent>
      </IonPage>
    </>
  );

};

export default Profile;

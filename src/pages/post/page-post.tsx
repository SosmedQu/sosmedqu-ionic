import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonLabel, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToolbar, RefresherEventDetail, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { Post } from '../../components/post/Post';
import { useEffect, useRef, useState } from 'react';
import { TopBar, SideBar, ActionSheetPublic } from '../../components/Menu';
import { FabAdd } from '../../components/fab';
import MyApi from '../../helpers/my-api_helper';


const PagePost: React.FC = () => {
  // const [searchText, setSearchText] = useState('');

  const [showLoading, setShowLoading] = useState(true);
  const slider = useRef<HTMLIonSlidesElement>(null);
  const [value, setValue] = useState("0");
  const [actionSheet, setActionSheet] = useState(false);

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    pagination: {
      el: null
    },

  };
  // a function to handle the segment changes
  const handleSegmentChange = (e: any) => {
    setValue(e.detail.value);
    slider.current!.slideTo(e.detail.value);
  };

  const [postMedia, setPostMedia] = useState<any>([]);
  const [whenError, setWhenError] = useState("");
  useEffect(() => {
    const api = new MyApi();
    const loadData = async () => {
      await api.getAllPost().then((response) => {
        setPostMedia(response.data.posts);
      }, err => {
        console.log(err.message);
      }).catch((err) => {
        console.log(err.response);
      }).finally(() => {
        setShowLoading(false);
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
        {/* <HeaderPost /> */}
        <IonHeader>
          <IonToolbar>
            <TopBar />
            <IonSegment color="secondary" value={value} onIonChange={(e) => handleSegmentChange(e)}>
              <IonSegmentButton value="0">
                <IonLabel>Media</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1">
                <IonLabel>Text</IonLabel>
              </IonSegmentButton>
            </IonSegment >
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
          />
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Postingan</IonTitle>
            </IonToolbar>
          </IonHeader>
          <FabAdd />
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonSlides options={slideOpts} ref={slider}>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  {postMedia.map((dataPost: any, i: any) =>
                    dataPost.PostFiles.length > 0 &&
                    (
                      <IonCol key={i} size="12" sizeLg='3' style={{ padding: 0 }}>
                        <Post data={dataPost} actionClick={() => setActionSheet(true)}>
                          <ActionSheetPublic show={actionSheet} onDidDismiss={() => setActionSheet(false)} idPost={dataPost.id} />
                        </Post>
                      </IonCol>
                    ))}
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <IonGrid>
                <IonRow>
                  {postMedia.map((dataPost: any, i: any) =>
                    dataPost.PostFiles.length == 0 &&
                    (
                      <IonCol key={i} size="12" style={{ padding: 0 }}>
                        <Post data={dataPost} actionClick={() => setActionSheet(true)}>
                          <ActionSheetPublic show={actionSheet} onDidDismiss={() => setActionSheet(false)} idPost={dataPost.id} />
                        </Post>
                      </IonCol>
                    ))}
                </IonRow>
              </IonGrid>
            </IonSlide>
          </IonSlides>
        </IonContent>
      </IonPage >
    </>
  );
};



export default PagePost;

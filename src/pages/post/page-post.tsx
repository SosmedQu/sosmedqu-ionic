import { IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentButton, IonSlide, IonSlides, RefresherEventDetail } from '@ionic/react';
import { Post } from '../../components/post/Post';
import { useEffect, useRef, useState } from 'react';
import { SideBar, ActionSheetPost } from '../../components/Menu';
import MyApi from '../../helpers/my-api_helper';
import { PageError } from '../page-error';
import { IconLG, IconToolbar } from '../../components/Utils/style/icon';
import { addSharp, searchOutline, warningOutline } from 'ionicons/icons';
import { ToolBarWithSideBar } from '../../components/element/toolbar';
import { BoxSegment, Segment } from '../../components/Utils/style/segment';
import { useHistory } from 'react-router';
import { getdataToken } from '../../interface/IdataToken';
import { Loading } from '../../components/Utils/style/loading';


const PagePost: React.FC = () => {
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(true);
  const slider = useRef<HTMLIonSlidesElement>(null);
  const slide = useRef<HTMLIonSlideElement>(null);
  const content = useRef<HTMLIonContentElement>(null);
  const [value, setValue] = useState("0");
  const [actionPost, setActionPost] = useState(false);

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
    content.current?.scrollToTop();
  };

  const handleSlideChange = (e: any) => {
    slider.current?.getActiveIndex().then((val) => {
      setValue(`${val}`);
    });
  }
  const dataToken = getdataToken();
  const [postMedia, setPostMedia] = useState<any>([]);
  const [whenError, setWhenError] = useState("");
  useEffect(() => {
    const api = new MyApi();
    const loadData = async () => {
      await api.getAllPost().then((response) => {
        setPostMedia(response.data.posts);
      }, err => {
        if (err.response.data === undefined) {
          setWhenError(err.message);
        }
        console.log(err);
      }).catch((err) => {
        console.log(err.response);
      }).finally(() => {
        setShowLoading(false);
      });
    }
    loadData();
  }, [])
  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    window.location.reload();
    event.detail.complete();
  }

  return (
    <>
      <SideBar />
      <IonPage id="main">
        <IonHeader>
          <ToolBarWithSideBar>
            {dataToken &&
              <IconToolbar onClick={() => setActionPost(true)} slot="end" icon={addSharp} />
            }
            <IconToolbar slot='end' icon={searchOutline} onClick={() => history.push("/search/post", postMedia)} />
          </ToolBarWithSideBar>
        </IonHeader>
        <IonContent fullscreen ref={content}>
          <BoxSegment>
            <Segment color="dark" className='rounded' value={value} onIonChange={(e) => handleSegmentChange(e)}>
              <IonSegmentButton value="0">
                <IonLabel>Media</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1">
                <IonLabel>Text</IonLabel>
              </IonSegmentButton>
            </Segment >
          </BoxSegment>
          <Loading
            cssClass='loading-post'
            isOpen={showLoading}
            spinner={'lines'}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}
          />
          <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          {/* {dataToken && dataToken.role == 'pelajar' && (<FibPost />)} */}
          {postMedia.length > 0
            ? (<IonSlides options={slideOpts} ref={slider} onIonSlideWillChange={(e) => handleSlideChange(e)}>
              <IonSlide ref={slide}>
                <IonGrid>
                  <IonRow>
                    <ActionSheetPost show={actionPost} onDidDismiss={() => setActionPost(false)} />
                    {postMedia.map((dataPost: any, i: any) =>
                      dataPost.PostFiles.length > 0 &&
                      (
                        <IonCol key={i} size="12" sizeLg='3' style={{ padding: 0 }}>
                          <Post data={dataPost}>
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
                      dataPost.PostFiles.length === 0 &&
                      (
                        <IonCol key={i} size="12" style={{ padding: 0 }}>
                          <Post data={dataPost}>
                          </Post>
                        </IonCol>
                      ))}
                  </IonRow>
                </IonGrid>
              </IonSlide>
            </IonSlides>)
            : <PageError title={whenError}>
              <IconLG icon={warningOutline}></IconLG>
            </PageError>
          }
        </IonContent>
      </IonPage >
    </>
  );
};



export default PagePost;

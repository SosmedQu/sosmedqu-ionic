import { IonCol, IonContent, IonFab, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { Post } from '../../components/post/Post';
import { useEffect, useRef, useState } from 'react';
import { TopBar, SideBar } from '../../components/menu/Menu';
import { FabAdd } from '../../components/fab';
import MyApi from '../../helpers/my-api';


const PagePost: React.FC = () => {
  // const [searchText, setSearchText] = useState('');

  const slider = useRef<HTMLIonSlidesElement>(null);
  const [value, setValue] = useState("0");

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
  useEffect(() => {
    const api = new MyApi();
    const loadData = async () => {
      await api.getAllPost().then((response) => {
        setPostMedia(response.data.posts);
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Postingan</IonTitle>
            </IonToolbar>
          </IonHeader>
          <FabAdd />
          <IonSlides options={slideOpts} ref={slider}>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  {postMedia.map((dataPost: any) =>
                    dataPost.PostFiles.length > 0 &&
                    (
                      <IonCol size="12" style={{ padding: 0 }}><Post data={dataPost} /></IonCol>
                    ))}
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <IonGrid>
                <IonRow>
                  {postMedia.map((dataPost: any) =>
                    dataPost.PostFiles.length == 0 &&
                    (
                      <IonCol size="12" style={{ padding: 0 }}><Post data={dataPost} /></IonCol>
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

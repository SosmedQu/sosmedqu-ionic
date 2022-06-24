import { IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { PostDefault, PostText } from '../components/post/Post';
import { useRef, useState } from 'react';
import { TopBar, SideBar } from '../components/menu/Menu';


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

  // a function to handle the slider changes
  const handleSlideChange = async (event: any) => {
    let index: number = 0;
    await event.target.getActiveIndex().then((value: any) => (index = value));
    setValue('' + index)
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
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Postingan</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonSlides pager={true} options={slideOpts} onIonSlideDidChange={(e) => handleSlideChange(e)} ref={slider}>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol size="12"><PostDefault /></IonCol>
                  <IonCol size="12"><PostDefault /></IonCol>
                  <IonCol size="12"><PostDefault /></IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
            {/*-- Package Segment --*/}
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol><PostText /></IonCol>
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

import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentButton, IonSlide, IonSlides, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { addSharp, pencil, newspaperOutline, logoVimeo, ribbonSharp } from 'ionicons/icons';
import { useState, useRef } from 'react';

import { useHistory, useLocation } from 'react-router';
import { ToolBarWithSideBar } from '../../components/element/toolbar';
import { SideBar, ActionSheetPost } from '../../components/Menu';
import MyProfile from '../../components/myprofile';
import NeedAuth from '../../components/NeedAuth';
import PostByUser from '../../components/post/post-by-user';
import { Header } from '../../components/Utils/style/header';
import { IconToolbar, IconSM } from '../../components/Utils/style/icon';
import { Segment } from '../../components/Utils/style/segment';
import MyApi from '../../helpers/my-api_helper';

interface IProfile {
    id?: number;
    username?: string;
    email?: string;
}

const ProfileView: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const profileId: any = location.state;
    const [myProfile, setMyProfile] = useState<IProfile>();
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
    useIonViewWillEnter(() => {
        const api = new MyApi();
        const loadData = async () => {
            await api.getProfileById(profileId).then((profile) => {
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

    // function handleUpdate() {
    //     history.push("/student/update", myProfile)
    // }
    console.log(myProfile)
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <Header>
                    <ToolBarWithSideBar>

                    </ToolBarWithSideBar>
                </Header>
                <IonContent fullscreen>
                    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                    {myProfile
                        ? (
                            <MyProfile data={myProfile} />
                        )
                        : <NeedAuth name='Profile' />}
                    <Segment color="secondary" value={value} onIonChange={(e: any) => handleSegmentChange(e)}>
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

export default ProfileView;

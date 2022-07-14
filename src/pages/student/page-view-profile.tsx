import { IonCol, IonContent, IonGrid, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentButton, IonSlide, IonSlides, RefresherEventDetail, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { newspaperOutline, logoVimeo, ribbonSharp, bookOutline, airplane } from 'ionicons/icons';
import { useState, useRef, useEffect } from 'react';

import { useLocation } from 'react-router';
import { EbookCard } from '../../components/ebook';
import { ToolBarWithSideBar } from '../../components/element/toolbar';
import { SideBar, ActionSheetPost } from '../../components/Menu';
import MyProfile from '../../components/myprofile';
import NeedAuth from '../../components/NeedAuth';
import PostByUser from '../../components/post/post-by-user';
import { BoxError } from '../../components/Utils/style/box-error';
import { Header } from '../../components/Utils/style/header';
import { IconSM } from '../../components/Utils/style/icon';
import { Segment } from '../../components/Utils/style/segment';
import MyApi from '../../helpers/my-api_helper';

interface IProfile {
    id?: number;
    username?: string;
    email?: string;
}

const ProfileView: React.FC = () => {
    const api = new MyApi();
    const [presentAlert] = useIonAlert();
    const location = useLocation();
    const profileId: any = location.state;
    const [myProfile, setMyProfile] = useState<IProfile>();
    const [checkFollow, setCheckFollow] = useState(false);
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
    const handlerFollow = () => {
        api.follow(myProfile?.id).then((res) => {
            setCheckFollow(true)
            setFollowers(followers! + 1);
        })
    }
    const handlerUnfollow = () => {
        presentAlert({
            header: 'Unfollow?',
            message: "Yakin ingin unfollow pelajar ini?",
            cssClass: "alert-logout",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        api.unfollow(myProfile?.id).then((res) => {
                            setCheckFollow(false)
                            setFollowers(followers! - 1);
                        })
                    }
                },
            ],
        })
    }
    useIonViewWillEnter(() => {
        const loadData = async () => {
            await api.getProfileById(profileId).then((profile) => {
                setMyProfile(profile.data.user);
                console.log(profile.data)
                setCheckFollow(profile.data.checkFollow);
                setFollowers(parseInt(profile.data.follower[0].follower));
                setFollowing(profile.data.following[0].following);
                api.getMyEbooks(profile.data.user.id).then((res) => {
                    setMyEbook(res.data.ebooks)
                }, err => {
                    console.log(err)
                }).finally(
                )
            }, err => {
                console.log(err);
            }).catch((err) => {
                console.log(err);
            });
        }
        loadData();
    })
    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        window.location.reload();
        event.detail.complete();
    }

    // function handleUpdate() {
    //     history.push("/student/update", myProfile)
    // }
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
                            <MyProfile
                                data={myProfile}
                                clickFollow={handlerFollow}
                                clickUnfollow={handlerUnfollow}
                                checkFollow={checkFollow}
                                followers={followers}
                                following={following} />
                        )
                        : <NeedAuth name='Profile' />}
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
                            <BoxError>User belum memiliki prestasi</BoxError>
                        </IonSlide>
                    </IonSlides>
                </IonContent>
            </IonPage>
        </>
    );

};

export default ProfileView;

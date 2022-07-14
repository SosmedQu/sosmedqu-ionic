import { IonActionSheet, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonMenu, IonText, IonToolbar, useIonAlert, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { arrowRedoOutline, bookSharp, calendarSharp, closeSharp, documentSharp, heartOutline, logoVimeo, mailSharp, newspaper, notifications, pencil, powerSharp, settingsSharp, trash, trophySharp, warningOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AssetsApi from '../helpers/assets-api_helper';
import MyApi from '../helpers/my-api_helper';
import { navigate } from '../helpers/navigation_helper';
import IAlert from '../interface/IAlert';
import { getdataToken } from '../interface/IdataToken';
import IProfile from '../interface/IProfile';
// import { getdataToken } from '../interface/IdataToken';
import { AlertOk } from './Alert';
import './component.css'
import { SosmedQuTitle } from './typography';
import Avatar from './Utils/style/avatar';
import Color from './Utils/style/color';

const api = new MyApi();

const ProfileSidebar = styled(IonToolbar)`

    .toolbar-content{
        display: grid;
        grid-template-areas: "foto title"
                            "footer footer";
        grid-template-columns: 1fr 2.5fr;
        .foto{
            margin-left: 16px;
            grid-area: foto;
        }
        .title {
            margin-right: 16px;
            margin: 0 0 0 16px;
            grid-area: title;  
            .nama{
                font-size: 18px;
                line-height: 18px;
                font-weight: 700;
                overflow: hidden;
                display: -webkit-box; /* fallback */
                -webkit-line-clamp: 2; /* number of lines to show */
                -webkit-box-orient: vertical;
            }
            .role{
                
            }
            study-at {
                overflow: hidden;
                display: -webkit-box; /* fallback */
                -webkit-line-clamp: 2; /* number of lines to show */
                -webkit-box-orient: vertical;
            }
        }
        .footer{
            grid-area: footer;
            background-color: var(--ion-color-secondary);
            color: var(--ion-color-primary-contras);
            font-weight: bold;
            padding: 8px 16px;
            display: flex;
            justify-content: space-between;
            span{
                font-size: 20px;
            }
        }
    }
`;

const IconSidebar = styled(IonIcon)`
    color: ${Color.primary.blue};
`;

const Label = styled(IonLabel)`
    font-family: inter sans-serif !important;
`;

const Item = styled(IonItem)`
    --border-style: unset !important:
`;


const SideBar: React.FC = () => {
    const api = new MyApi();
    const [presentAlert] = useIonAlert();
    const dataToken = getdataToken();
    // console.log(dataToken);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollwing] = useState<number>(0);
    const [profile, setProfile] = useState<IProfile>();

    useIonViewWillEnter(() => {
        api.getProfileById(dataToken?.userId).then((res) => {
            setProfile(res.data.user);
            setFollowers(res.data.follower[0].follower);
            setFollwing(res.data.following[0].following);
        }, err => {
            console.log(err);
        })
    })
    return (
        <IonMenu side="start" menuId="first" contentId="main">
            <IonHeader>
                <ProfileSidebar color={'primary'}>
                    <SosmedQuTitle>SosmedQu</SosmedQuTitle>
                    {dataToken && dataToken.role == 'pelajar' &&
                        <div className="toolbar-content">
                            <Avatar className='foto'>
                                <IonImg src={profile ? `${AssetsApi.URLImgProfile}/${profile.image}` : process.env.PUBLIC_URL + "assets/img/no-picture.svg"}></IonImg>
                            </Avatar>
                            <div className="title">
                                <p className='nama'>{dataToken.username}</p>
                                <p className='role m-0'>{dataToken.role}</p>
                                <p className='study-at'>{dataToken.studyAt}</p>
                            </div>
                            {dataToken && dataToken.role === 'pelajar' &&
                                <div className="footer">
                                    <div className='text-center'>
                                        <IonText className='d-block'>{followers}</IonText>
                                        <IonText className='d-block'>Folowers</IonText>
                                    </div>
                                    <div className='text-center'>
                                        <IonText className='d-block'>{following}</IonText>
                                        <IonText className='d-block'>Following</IonText>
                                    </div>
                                    <div className='text-center'>
                                        <IonText className='d-block'>123</IonText>
                                        <IonText className='d-block'>Postingan</IonText>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </ProfileSidebar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItemGroup>
                        <IonItemDivider>
                            <Label>social</Label>
                        </IonItemDivider>
                        {dataToken &&
                            <Item href='/chatting'>
                                <IconSidebar icon={mailSharp} className="me-2 icon-navigation"></IconSidebar>
                                <Label>PesanQu</Label>
                            </Item>
                        }
                        {dataToken &&
                            <Item href='/chatting'>
                                <IconSidebar icon={notifications} className="me-2 icon-navigation"></IconSidebar>
                                <Label>NotifQu</Label>
                            </Item>
                        }
                        <Item href='/follower-ranking'>
                            <IconSidebar icon={trophySharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>Top followers pelajar</Label>
                        </Item>
                    </IonItemGroup>
                    {dataToken && dataToken.role === 'pelajar' &&
                        <IonItemGroup style={{ margin: "0 0 45px 0" }}>
                            <IonItemDivider>
                                <Label>for you</Label>
                            </IonItemDivider>
                            <Item href='/lesson'>
                                <IconSidebar icon={calendarSharp} className="me-2 icon-navigation"></IconSidebar>
                                <Label>JadwalQu</Label>
                            </Item>
                            <Item href='/ebook'>
                                <IconSidebar icon={bookSharp} className="me-2 icon-navigation"></IconSidebar>
                                <Label>EbookQu</Label>
                            </Item>
                            <Item href='/notequ'>
                                <IconSidebar icon={documentSharp} className="me-2 icon-navigation"></IconSidebar>
                                <Label>NoteQu</Label>
                            </Item>
                        </IonItemGroup>
                    }
                    {/* {dataToken &&
                        <IonItemGroup style={{ margin: "0 0 45px 0" }}>
                            <IonItemDivider>
                                <Label>other menu</Label>
                            </IonItemDivider>
                            <Item href="/setting">
                                <IconSidebar icon={settingsSharp} className="me-2 icon-navigation"></IconSidebar>
                                <Label>Setting</Label>
                            </Item>
                        </IonItemGroup>
                    } */}
                </IonList>
                {dataToken &&
                    <Item slot='fixed' style={{ bottom: 0, left: 0, right: 0, borderBlock: "1px solid #999999" }}
                        onClick={() => {
                            presentAlert({
                                header: 'Logout?',
                                message: "Yakin ingin Logout?",
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
                                            api.logout().then((res) => {
                                                navigate("login")
                                            })
                                        }
                                    },
                                ],
                            })
                        }}
                    >
                        <IconSidebar icon={powerSharp} className="me-2 icon-navigation"></IconSidebar>
                        <Label>Logout</Label>
                    </Item>
                }
            </IonContent>
        </IonMenu >
    )
}

const ActionSheet: React.FC<{ show: boolean, onDidDismiss: () => void, data: any }> = (params) => {
    const [alertOk, setAlertOk] = useState<IAlert>({
        showAlert: false
    });
    const history = useHistory();
    return (
        <IonContent>
            <AlertOk data={alertOk} />
            <IonActionSheet
                isOpen={params.show}
                onDidDismiss={params.onDidDismiss}
                cssClass='my-custom-class'
                buttons={[
                    {
                        text: 'Edit Post',
                        icon: pencil,
                        data: 'Data value',
                        handler: () => (
                            history.push(`/edite-post`, params.data)
                        )
                    }, {
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        id: 'delete-button',
                        data: {
                            type: 'delete'
                        },
                        handler: () => {
                            api.deletePost(params.data.id).then((res) => {
                                setAlertOk({
                                    showAlert: true,
                                    header: "Berhasil",
                                    message: res.data.msg,
                                    onDidDismiss: () => {
                                        setAlertOk({ showAlert: false })
                                    },
                                    type: 'success',
                                    okClick: () => {
                                        history.replace("/profile");
                                    }

                                })
                            }, err => {
                                setAlertOk({
                                    showAlert: true,
                                    header: "Gagal",
                                    message: err.response.data,
                                    onDidDismiss: () => {
                                        setAlertOk({ showAlert: false })
                                    },
                                    type: 'failed',
                                    okClick: () => {
                                    }

                                })
                            })
                        }
                    }, {
                        text: 'Cancel',
                        icon: closeSharp,
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]}
            >
            </IonActionSheet>
        </IonContent>
    )
}
const ActionSheetPublic: React.FC<{ show: boolean, onDidDismiss: () => void, idPost?: any }> = (params) => {
    const history = useHistory();
    return (
        <IonContent>
            <IonActionSheet
                isOpen={params.show}
                onDidDismiss={params.onDidDismiss}
                cssClass='my-custom-class'
                buttons={[
                    {
                        text: 'Share',
                        icon: arrowRedoOutline,
                        data: 10,
                        handler: () => {
                            console.log('Share clicked');
                        }
                    }, {
                        text: 'Favorite',
                        icon: heartOutline,
                        handler: () => {
                            console.log('Favorite clicked');
                        }
                    },
                    {
                        text: 'Laporkan',
                        icon: warningOutline,
                        handler: () => {
                            history.push("/violation/post", params.idPost);
                        }
                    },
                    {
                        text: 'Cancel',
                        icon: closeSharp,
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]}
            >
            </IonActionSheet>
        </IonContent>
    )
}
const ActionSheetPost: React.FC<{ show: boolean, onDidDismiss: () => void, idPost?: any }> = (params) => {

    const history = useHistory();
    return (
        <IonContent>
            <IonActionSheet
                isOpen={params.show}
                onDidDismiss={params.onDidDismiss}
                cssClass='my-custom-class'
                buttons={[
                    {
                        text: 'Tambah PostQu',
                        icon: newspaper,
                        data: 10,
                        handler: () => {
                            history.push("/add-post");
                        }
                    }, {
                        text: 'Cancel',
                        icon: closeSharp,
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }]}
            >
            </IonActionSheet>
        </IonContent>
    )
}

export { SideBar, ActionSheet, ActionSheetPublic, ActionSheetPost };
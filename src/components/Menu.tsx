import { IonActionSheet, IonAvatar, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonMenu, IonMenuToggle, IonToolbar } from '@ionic/react';
import { bookSharp, calendarSharp, closeSharp, heart, mailSharp, menuSharp, notifications, pencil, powerSharp, searchOutline, settingsSharp, share, trash, trophySharp } from 'ionicons/icons';
import { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Env from '../helpers/env_helper';
import MyApi from '../helpers/my-api_helper';
import { navigate } from '../helpers/navigation_helper';
import IAlert from '../interface/IAlert';
import { AlertOk } from './Alert';
import './component.css'
import { SosmedQuTitle } from './typography';
import Color from './Utils/style/color';

const api = new MyApi();

const TopBar: React.FC = () => {
    return (
        <div id="nav-top">
            <IonMenuToggle>
                <IonIcon icon={menuSharp} className="icon-navigation"></IonIcon>
            </IonMenuToggle>
            <div>
                <Link to="/notif">
                    <IonIcon icon={searchOutline} className="me-2 icon-navigation"></IonIcon>
                </Link>
            </div>
        </div>
    )
}

const ProfileSidebar = styled(IonToolbar)`

    .toolbar-content{
        margin: 24px 16px;
        display: grid;
        grid-template-areas: "foto title"
                            "footer footer";

        .foto{
            grid-area: foto;
        }
        .title {
            margin: 0 0 0 16px;
            grid-area: title;  
            .nama{
                font-size: 24px;
                line-height: 24px;
                font-weight: 700;
                font-family: Inter;
                overflow: hidden;
                display: -webkit-box; /* fallback */
                -webkit-line-clamp: 2; /* number of lines to show */
                -webkit-box-orient: vertical;
            }
            .study-at{
                padding: 16px 0 0 0;
                font-size: 18px;
                font-family: Inter;
            }
        }
        .footer{
            grid-area: footer;
            display: flex;
            justify-content: space-between;
            margin: 32px 8px 0;
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
    return (
        <IonMenu side="start" menuId="first" contentId="main">
            <IonHeader>
                <ProfileSidebar color={'primary'}>
                    <SosmedQuTitle>SosmedQu</SosmedQuTitle>
                    <div className="toolbar-content">
                        <IonAvatar className='foto'>
                            <IonImg src={process.env.PUBLIC_URL + "assets/img/no-picture.svg"}></IonImg>
                        </IonAvatar>
                        <div className="title">
                            <p className='nama'>Nama Pengguna Lorem ipsum dolor</p>
                            <p className='study-at'>Universitas BSI</p>
                        </div>
                        <div className="footer">
                            <IonLabel className='followers'>Followers <span>300</span></IonLabel>
                            <IonLabel className='disukai'>disukai <span>300</span></IonLabel>
                        </div>
                    </div>
                </ProfileSidebar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItemGroup>
                        <IonItemDivider>
                            <Label>social</Label>
                        </IonItemDivider>

                        <Item href='/chatting'>
                            <IconSidebar icon={mailSharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>PesanQu</Label>
                        </Item>
                        <Item href='/chatting'>
                            <IconSidebar icon={notifications} className="me-2 icon-navigation"></IconSidebar>
                            <Label>NotifQu</Label>
                        </Item>
                        <Item href='/follower-ranking'>
                            <IconSidebar icon={trophySharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>Top followers pelajar</Label>
                        </Item>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            <Label>for you</Label>
                        </IonItemDivider>

                        <Item href='/home'>
                            <IconSidebar icon={calendarSharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>JadwalQu</Label>
                        </Item>
                        <Item href='/ebook'>
                            <IconSidebar icon={bookSharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>EbookQu</Label>
                        </Item>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            <Label>other menu</Label>
                        </IonItemDivider>

                        <Item href="/setting">
                            <IconSidebar icon={settingsSharp} className="me-2 icon-navigation"></IconSidebar>
                            <Label>Setting</Label>
                        </Item>
                    </IonItemGroup>
                </IonList>
                <Item href="/logout" slot='fixed' style={{ bottom: 0, left: 0, right: 0, borderBlock: "1px solid #999999" }}>
                    <IconSidebar icon={powerSharp} className="me-2 icon-navigation"></IconSidebar>
                    <Label>Logout</Label>
                </Item>
            </IonContent>
        </IonMenu >
    )
}

const ActionSheet: React.FC<{ show: boolean, onDidDismiss: () => void, data?: any }> = (params) => {
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
                                        window.location.reload();
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
                        text: 'Share',
                        icon: share,
                        data: 10,
                        handler: () => {
                            console.log('Share clicked');
                        }
                    }, {
                        text: 'Favorite',
                        icon: heart,
                        handler: () => {
                            console.log('Favorite clicked');
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
                        text: 'Share',
                        icon: share,
                        data: 10,
                        handler: () => {
                            console.log('Share clicked');
                        }
                    }, {
                        text: 'Favorite',
                        icon: heart,
                        handler: () => {
                            console.log('Favorite clicked');
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

export { TopBar, SideBar, ActionSheet, ActionSheetPublic };
import { IonActionSheet, IonAvatar, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonMenu, IonMenuToggle, IonText, IonToolbar } from '@ionic/react';
import { bookSharp, calendarSharp, closeSharp, heart, mailSharp, menuSharp, notifications, pencil, powerSharp, searchOutline, settingsSharp, share, trash, trophySharp } from 'ionicons/icons';
import { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Env from '../helpers/env_helper';
import MyApi from '../helpers/my-api_helper';
import { navigate } from '../helpers/navigation_helper';
import IAlert from '../interface/IAlert';
// import { getdataToken } from '../interface/IdataToken';
import { AlertOk } from './Alert';
import './component.css'
import { FibPost } from './fab';
import { SosmedQuTitle } from './typography';
import Avatar from './Utils/style/avatar';
import Color from './Utils/style/color';

const api = new MyApi();

const ProfileSidebar = styled(IonToolbar)`

    .toolbar-content{
        display: grid;
        grid-template-areas: "foto title"
                            "footer footer";

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
            .status{

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
    // const dataToken = getdataToken();
    return (
        <IonMenu side="start" menuId="first" contentId="main">
            <IonHeader>
                <ProfileSidebar color={'primary'}>
                    <SosmedQuTitle>SosmedQu</SosmedQuTitle>
                    <div className="toolbar-content">
                        <Avatar className='foto'>
                            <IonImg src={process.env.PUBLIC_URL + "assets/img/no-picture.svg"}></IonImg>
                        </Avatar>
                        <div className="title">
                            {/* <p className='nama'>{dataToken.username}</p>
                            <p className='role'>{dataToken.role}</p> */}
                            <p className='study-at'>Universitas BSI</p>
                        </div>
                        <div className="footer">
                            <div className='text-center'>
                                <IonText className='d-block'>123</IonText>
                                <IonText className='d-block'>Folowers</IonText>
                            </div>
                            <div className='text-center'>
                                <IonText className='d-block'>123</IonText>
                                <IonText className='d-block'>Postingan</IonText>
                            </div>
                            <div className='text-center'>
                                <IonText className='d-block'>123</IonText>
                                <IonText className='d-block'>Disukai</IonText>
                            </div>
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
                                        history.goBack();
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

export { SideBar, ActionSheet, ActionSheetPublic };
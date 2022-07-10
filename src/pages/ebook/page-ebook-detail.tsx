import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonFab, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonPage, IonTitle, useIonAlert } from '@ionic/react';
import { addSharp, pencil, readerSharp, trash } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { SideBar } from '../../components/Menu';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Header } from '../../components/Utils/style/header';
import AssetsApi from '../../helpers/assets-api_helper';

import { Browser } from '@capacitor/browser';
import { getdataToken } from '../../interface/IdataToken';
import { IconToolbar } from '../../components/Utils/style/icon';
import MyApi from '../../helpers/my-api_helper';
import { navigate } from '../../helpers/navigation_helper';


const PageEbookDetail: React.FC = () => {
    const api = new MyApi();
    const [presentAlert] = useIonAlert();
    const dataToken = getdataToken();
    const history = useHistory();
    const location = useLocation();
    const ebook: any = location.state;
    const openCapacitorSite = async () => {
        await Browser.open({ url: encodeURI(`${AssetsApi.URLFileEbooks}/${ebook.fileName}`) });
    };
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <Header>
                    <ToolBarWithGoBack backTo={() => history.goBack()} title='E-BookQu'>
                        {ebook && dataToken?.userId === (ebook.userId) &&
                            <IconToolbar className='m-0' slot="end" icon={pencil} onClick={() => history.push("/ebook/update", ebook)} />
                        }
                    </ToolBarWithGoBack>
                </Header>
                <IonContent fullscreen>
                    {ebook && dataToken?.userId === (ebook.userId) &&
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonButton className="btn-circle" onClick={() => history.push("/ebook/create")}>
                                <IonIcon icon={addSharp} />
                            </IonButton>
                        </IonFab >
                    }
                    {ebook &&
                        <div className="content">
                            <IonImg src={`${AssetsApi.URLImgEbooks}/${ebook.image}`} />
                            <div className="detail-ebook-header px-2">
                                <div className="d-flex justify-content-between">
                                    <h5 className='mt-3'>{ebook.name}</h5>
                                    {ebook && dataToken?.userId === (ebook.userId) &&
                                        <IonButton color={'danger'} onClick={() => {
                                            presentAlert({
                                                header: 'Hapus Ebook?',
                                                message: "Yakin ingin Menghapus E-book ini?",
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
                                                            api.deleteEbook(ebook.id).then((res) => {
                                                                presentAlert({
                                                                    header: "berhasil",
                                                                    message: res.data.msg,
                                                                    cssClass: "alert-success",
                                                                    buttons: [
                                                                        {
                                                                            text: "OK",
                                                                            role: "confirm",
                                                                            handler: () => {
                                                                                navigate("/ebook")
                                                                            }
                                                                        }
                                                                    ]
                                                                })
                                                            })
                                                        }
                                                    },
                                                ],
                                            })
                                        }}>
                                            <IonIcon icon={trash} />
                                        </IonButton>
                                    }
                                </div>
                                <div className='d-flex justify-content-between mb-3'>
                                    <div>
                                        <p className='m-0 p-0'>penulis : {ebook.writer}</p>
                                        <p className='m-0 p-0'>penerbit : {ebook.publisher}</p>
                                        <p className='m-0 p-0'>tahun : {ebook.publicationYear}</p>
                                        <p className='m-0 p-0'>ISBN : {ebook.isbn}</p>
                                    </div>
                                    <IonButton className='' onClick={openCapacitorSite}>
                                        <IonIcon icon={readerSharp} slot="start" />
                                        <IonLabel>Baca</IonLabel>
                                    </IonButton>
                                </div>
                            </div>
                            <div className="description px-2">
                                <p>{ebook.description}</p>
                            </div>
                            <IonItemDivider className="mt-4">
                                <IonTitle style={{ padding: "0" }}>comment</IonTitle>
                            </IonItemDivider>
                            <div className="comment-ebook">
                                <div className="comment-user">
                                    <IonCard>
                                        <IonCardHeader style={{ padding: 0 }}>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonImg src={process.env.PUBLIC_URL + "assets/img/avatar.png"}></IonImg>
                                                </IonAvatar>
                                                <IonCardSubtitle>Nama Pengguna</IonCardSubtitle>
                                                <p className="time-upload" slot="end">1 day ago</p>
                                            </IonItem>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p className="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, omnis!</p>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                                <div className="comment-user">
                                    <IonCard>
                                        <IonCardHeader style={{ padding: 0 }}>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonImg src={process.env.PUBLIC_URL + "assets/img/avatar.png"}></IonImg>
                                                </IonAvatar>
                                                <IonCardSubtitle>Nama Pengguna</IonCardSubtitle>
                                                <p className="time-upload" slot="end">1 day ago</p>
                                            </IonItem>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p className="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, omnis!</p>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                                <div className="comment-user">
                                    <IonCard>
                                        <IonCardHeader style={{ padding: 0 }}>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonImg src={process.env.PUBLIC_URL + "assets/img/avatar.png"}></IonImg>
                                                </IonAvatar>
                                                <IonCardSubtitle>Nama Pengguna</IonCardSubtitle>
                                                <p className="time-upload" slot="end">1 day ago</p>
                                            </IonItem>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p className="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, omnis!</p>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                                <div className="comment-user">
                                    <IonCard>
                                        <IonCardHeader style={{ padding: 0 }}>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonImg src={process.env.PUBLIC_URL + "assets/img/avatar.png"}></IonImg>
                                                </IonAvatar>
                                                <IonCardSubtitle>Nama Pengguna</IonCardSubtitle>
                                                <p className="time-upload" slot="end">1 day ago</p>
                                            </IonItem>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            <p className="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, omnis!</p>
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                            </div>
                        </div>
                    }
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageEbookDetail;
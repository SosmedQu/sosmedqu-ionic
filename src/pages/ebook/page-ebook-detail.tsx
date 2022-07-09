import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonFab, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addSharp, readerSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { SideBar } from '../../components/Menu';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Header } from '../../components/Utils/style/header';


const PageEbookDetail: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <Header>
                    <ToolBarWithGoBack backTo={() => history.goBack()} title='E-BookQu'>
                    </ToolBarWithGoBack>
                </Header>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Home Page</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonButton className="btn-circle" onClick={() => history.push("/ebook/create")}>
                            <IonIcon icon={addSharp} />
                        </IonButton>
                    </IonFab >
                    <div className="content">
                        <IonImg src={process.env.PUBLIC_URL + "assets/img/default-ebook.svg"} />
                        <div className="detail-ebook-header px-2">
                            <h5>Lorem, ipsum dolor sit amet consectetur</h5>
                            <IonButton>
                                <IonIcon icon={readerSharp} slot="start" />
                                <IonLabel>Baca</IonLabel>
                            </IonButton>
                        </div>
                        <div className="description px-2">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, accusamus. Quod dolorum porro eaque sunt commodi eos enim sequi magnam nostrum tempora, neque laborum sint? Voluptates possimus architecto tempora praesentium dicta, adipisci veritatis autem consequuntur optio odio voluptas iure repudiandae modi vel eveniet ea dolore libero excepturi non, impedit nisi temporibus, iste voluptatem totam? Unde quisquam debitis laudantium obcaecati soluta, minima voluptatum quaerat id ad fugit! Quibusdam accusamus eius officiis delectus commodi laborum magni. Sed voluptates alias similique fugiat beatae! Cum quibusdam iure sapiente, itaque accusantium ea excepturi quidem porro! Quam nemo eligendi cum rerum, quos quas cupiditate officiis nostrum?</p>
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
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageEbookDetail;
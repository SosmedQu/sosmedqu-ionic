import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonNote, IonPage, IonRow, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { readerSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { FabAddEbook } from '../../components/fab';
import { SideBar, TopBar } from '../../components/menu/Menu';


const PageEbookDetail: React.FC = () => {
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <IonHeader>
                    <IonToolbar>
                        <TopBar />
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Home Page</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <FabAddEbook />
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
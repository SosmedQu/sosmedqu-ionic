import { IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackCircleSharp, arrowBackOutline, backspaceOutline, personCircle } from 'ionicons/icons';
import ExploreContainer from '../ExploreContainer';
import './chatting.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const ChattingDetail: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar style={{ "margin-inline": "16px" }} id="chating-nav">
                        <div className="back">
                            <Link to="/chatting">
                                <IonIcon icon={arrowBackOutline} slot="start"></IonIcon>
                            </Link>
                            <div className="user-chat">
                                <IonIcon icon={personCircle} slot="start" style={{ "font-size": "32px" }}></IonIcon>
                                <div className="user-chat-title">
                                    <IonTitle size="small" style={{ "padding": "0" }}>Nama Pengguna</IonTitle>
                                    <p>Online</p>
                                </div>
                            </div>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Chating</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid className='all-message'>
                        <IonRow>
                            <IonCol size="9">
                                <div className="message-left">
                                    <p>Message Left</p>
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow class='ion-justify-content-end'>
                            <IonCol size="9">
                                <div className="message-right">
                                    <p>Message Right Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quod exercitationem assumenda porro vel id facere sapiente illo aliquam, omnis quasi ut numquam, placeat nemo laborum temporibus alias accusantium cum fugit? Repudiandae dolorem reprehenderit eaque dolores quas obcaecati earum ipsum, cum molestias ad ullam placeat eligendi numquam, ratione fugit possimus, reiciendis voluptatem tempora officiis maiores quibusdam omnis! Distinctio atque aliquam cum consectetur modi ab, suscipit voluptates laborum corrupti eius totam, qui impedit odio error quis? Iure necessitatibus accusantium unde ipsam maiores veniam? Velit fugiat quisquam deserunt nisi et! Porro incidunt, id cum quia beatae qui exercitationem eligendi necessitatibus odio suscipit.</p>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonContent>
        </IonPage>
    )
}

const Chatting: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">List Chatting</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonHeader>
                    <IonToolbar style={{ "margin-inline": "16px" }} id="chating-nav">
                        <div className="back">
                            <Link to="/">
                                <IonIcon icon={arrowBackOutline} slot="start"></IonIcon>
                            </Link>
                            <IonTitle size="small">Nama Pengguna</IonTitle>
                        </div>
                    </IonToolbar>
                    <IonSearchbar placeholder="Search" onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                </IonHeader>
                <div className="chat-items">
                    <div className="chat-item">
                        <IonGrid>
                            <IonRow style={{ "align-items": "center" }}>
                                <IonCol className="chat-image" size="2">
                                    <IonIcon icon={personCircle} style={{ "font-size": "50px" }}></IonIcon>
                                </IonCol>
                                <IonCol className="chat-title" size="10">
                                    <Link to="chatting-detail" className="link-item">
                                        <IonRow>
                                            <IonCol style={{ "padding": "0" }} size="9">
                                                <p><b>Nama pengguna</b></p>
                                            </IonCol>
                                            <IonCol style={{ "text-align": "end ", "padding": "0", "font-size": "12px" }} size="3">
                                                <p>10:00</p>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol style={{ "padding": "0" }} size="12">
                                                <p>Lorem ipsum dolor sit ipsummi...</p>
                                            </IonCol>
                                        </IonRow>
                                    </Link>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export { Chatting, ChattingDetail };
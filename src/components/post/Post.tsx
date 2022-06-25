import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow } from '@ionic/react';
import { arrowRedoSharp, chatboxEllipsesSharp, chatbubbleEllipsesOutline, chatbubblesSharp, globeSharp, thumbsDownSharp, thumbsUpSharp, warningSharp } from 'ionicons/icons';
import { } from 'react-router-dom';
import './post.css';

const PostDefault: React.FC = () => {
    return (
        <div className="container">
            <IonGrid>
                <IonCardHeader>
                    <div className="post-header">
                        <div className="post-profile ">
                            <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                            <div className="name text-start">
                                <h6 className="">Nama Pengguna</h6>
                                <p className="small "><IonIcon icon={globeSharp} className="" />public</p>
                            </div>
                        </div>
                        <p className="small">1 day ago</p>
                    </div>
                </IonCardHeader>

                <IonCardContent className="post-content">
                    <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="" />
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                </IonCardContent>
            </IonGrid>
        </div>
    );
}

const PostText: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">Nama Pengguna</h6>
                            <p className="small "><IonIcon icon={globeSharp} className="" />public</p>
                        </div>
                    </div>
                    <p className="small">1 day ago</p>
                </div>
            </IonCardHeader>

            <IonCardContent className="post-content">
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
    );
}
const PostMedia: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">Nama Pengguna</h6>
                            <p className="small "><IonIcon icon={globeSharp} className="" />public</p>
                        </div>
                    </div>
                    <p className="small">1 day ago</p>
                </div>
            </IonCardHeader>

            <IonCardContent className="post-content">
                <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="" />
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
    );
}

const PostShort: React.FC = () => {
    return (
        <div className="short">
            <video loop muted autoPlay className="short-video">
                <source src={process.env.PUBLIC_URL + "/assets/video/video.mp4"} type="video/mp4" />
            </video>
            <div className="short-profile">
                <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle profile-img" />
                <div className="profile-name text-start">
                    <h6 className="">Nama Pengguna</h6>
                    <p className="small "><IonIcon icon={globeSharp} className="" />public</p>
                </div>
                <IonIcon className="icon chat-me" icon={chatbubbleEllipsesOutline} />
                <div className="short-description">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, officiis?</p>
                </div>
            </div>
            <div className="short-response">
                <div className="item">
                    <IonIcon className="icon" icon={thumbsUpSharp} />
                    <small>123</small>
                </div>
                <IonIcon className="icon" icon={chatbubblesSharp} />
                <IonIcon className="icon" icon={arrowRedoSharp} />
                <IonIcon className="icon" icon={warningSharp} />
            </div>
        </div>
    )
}

export { PostDefault, PostText, PostMedia, PostShort };
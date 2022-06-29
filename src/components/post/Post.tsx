import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonImg, IonRow, IonSlide, IonSlides } from '@ionic/react';
import { arrowRedoOutline, arrowRedoSharp, cameraOutline, cameraSharp, chatboxEllipsesSharp, chatbubbleEllipsesOutline, chatbubblesOutline, chatbubblesSharp, globeSharp, pencilSharp, thumbsDownSharp, thumbsUpOutline, thumbsUpSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { } from 'react-router-dom';
import './post.css';

const PostDefault: React.FC = () => {
    return (
        <div className="container">
            <IonGrid >
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
        <IonCard style={{ margin: "4px 0" }}>
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
const PostMultipleMedia: React.FC = () => {
    const slideImageOpts = {
        initialSlide: 0,
        speed: 400
    };
    return (
        <IonCard style={{ margin: "4px 0" }}>
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">Nama Pengguna</h6>
                            <p className="small"><IonIcon icon={globeSharp} className="" />public</p>
                        </div>
                    </div>
                    <p className="small">1 day ago</p>
                </div>
            </IonCardHeader>
            <IonCardContent className="post-content">
                <IonSlides options={slideImageOpts}>
                    <IonSlide>
                        <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="" />
                    </IonSlide>
                    <IonSlide>
                        <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="" />
                    </IonSlide>
                    <IonSlide>
                        <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="" />
                    </IonSlide>
                </IonSlides>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
    );
}
const PostMedia: React.FC = () => {
    return (
        <IonCard style={{ margin: "4px 0" }}>
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">Nama Pengguna</h6>
                            <p className="small"><IonIcon icon={globeSharp} className="" />public</p>
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
            <div className="short-add">
                <IonIcon icon={cameraOutline} className="icon" color={'secondary'} />
            </div>
            <div className="short-profile">
                <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle profile-img" />
                <div className="profile-name text-start">
                    <h6 className="">Nama Pengguna</h6>
                    <p className="small "><IonIcon icon={globeSharp} className="" />public</p>
                </div>
                <IonIcon className="icon chat-me" icon={chatbubbleEllipsesOutline} color={'secondary'} />
                <div className="short-description">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, officiis?</p>
                </div>
            </div>
            <div className="short-response">
                <div className="item">
                    <IonIcon className="icon" icon={thumbsUpOutline} color={'secondary'} />
                    <small>123</small>
                </div>
                <IonIcon className="icon" icon={chatbubblesOutline} color={'secondary'} />
                <IonIcon className="icon" icon={arrowRedoOutline} color={'secondary'} />
                <IonIcon className="icon" icon={warningOutline} color={'secondary'} />
            </div>
        </div>
    )
}

export { PostDefault, PostText, PostMedia, PostMultipleMedia, PostShort };
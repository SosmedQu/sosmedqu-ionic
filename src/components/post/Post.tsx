import {  IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonSlide, IonSlides } from '@ionic/react';
import { arrowRedoOutline,  cameraOutline,  chatbubbleEllipsesOutline, chatbubblesOutline,  globeSharp,  thumbsUpOutline,  warningOutline } from 'ionicons/icons';
import { } from 'react-router-dom';
import './post.css';

const Post: React.FC<{ data: any }> = (props) => {
    const slideOpts = {
        speed: 500
    }
    return (
        <IonCard style={{ margin: "4px 0" }}>
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">{props.data.User ? props.data.User.username : "kosong"}</h6>
                            <p className="small"><IonIcon icon={globeSharp} className="" />public</p>
                        </div>
                    </div>
                    <p className="small">1 day ago</p>
                </div>
            </IonCardHeader>

            <IonCardContent className="post-content">
                {props.data.PostFiles.length > 0
                    && props.data.PostFiles.length == 1 ?
                        props.data.PostFiles.map((file: any) => (
                        <IonImg src={"http://localhost:3000/images/posts/" + file.fileName} className="" />
                        ))
                    : <IonSlides pager={true} options={slideOpts} style={{ width: "90vw" }}>
                    {props.data.PostFiles.map((file: any) => (
                        <IonSlide>
                            <IonImg src={"http://localhost:3000/images/posts/" + file.fileName} className="" />
                        </IonSlide>
                    ))
                    }
                </IonSlides>
                }
                {props.data.caption}
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
                <IonImg src={process.env.PUBLIC_URL + "/assets/img/no-picture.svg"} style={{ "border-radius": "50%" }} className="profile-img" />
                <div className="profile-name ion-text-start">
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

export { Post, PostShort };
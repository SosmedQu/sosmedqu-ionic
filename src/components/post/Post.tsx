import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonItem, IonLabel, IonSlide, IonSlides } from '@ionic/react';
import { arrowRedoOutline, cameraOutline, chatbox, chatbubbleEllipsesOutline, chatbubblesOutline, chatbubblesSharp, ellipsisVerticalSharp, globeSharp, thumbsUpOutline, thumbsUpSharp, warningOutline } from 'ionicons/icons';
import { useState } from 'react';
import { } from 'react-router-dom';
import styled from 'styled-components';
import Env from '../../helpers/env';
import { ActionSheet } from '../Menu';
import Color from '../Utils/style/color';
import './post.css';

const CardFooter = styled.div`
    display: flex;
    margin: 16px;
    justify-content: space-between;
`;

const Icon = styled(IonIcon)`
    font-size: 24px;
    color: ${Color.primary.blue};
`;

const Label = styled(IonLabel)`
    font-family: inter sans-serif !important;
    font-size: 14px;
`;

const Post: React.FC<{ data: any }> = (props) => {
    const slideOpts = {
        speed: 500
    }
    const [actionSheet, setActionSheet] = useState(false);
    return (
        <IonCard style={{ margin: "4px 0" }}>
            <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} id={props.data.id} />
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">{props.data.User ? props.data.User.username : "kosong"}</h6>
                            <p className="small">{props.data.privacy}</p>
                        </div>
                    </div>
                    <IonIcon style={{ fontSize: "24px" }} icon={ellipsisVerticalSharp} onClick={() => { setActionSheet(true) }}></IonIcon>
                </div>
            </IonCardHeader>

            <IonCardContent className="post-content">
                {props.data.PostFiles.length > 0
                    && props.data.PostFiles.length == 1 ?
                    props.data.PostFiles.map((file: any) => (
                        <IonImg src={`http://${Env.HOST}:${Env.PORT}/images/posts/` + file.fileName} className="" />
                    ))
                    : <IonSlides pager={true} options={slideOpts} style={{ width: "90vw" }}>
                        {props.data.PostFiles.map((file: any) => (
                            <IonSlide>
                                <IonImg src={`http://${Env.HOST}:${Env.PORT}/images/posts/` + file.fileName} className="" />
                            </IonSlide>
                        ))
                        }
                    </IonSlides>
                }
                {props.data.caption}
                <CardFooter>
                    <IonButton color={'light'}>
                        <Icon slot='start' icon={thumbsUpSharp}></Icon>
                        <Label>10k</Label>
                    </IonButton>
                    <IonButton color={'light'}>
                        <Icon slot='start' icon={chatbubblesSharp}></Icon>
                        <Label>10k</Label>
                    </IonButton>
                </CardFooter>
            </IonCardContent>
        </IonCard>
    );
}

const MyPostBox = styled.div`
    display: flex;
`;
const MyPostImage = styled(IonImg)`
    height: 120px;
    width: 120px;
    object-fit: cover;
`;
const MyPostComponent: React.FC<{ data: any }> = (props) => {
    const slideOpts = {
        speed: 500
    }
    return (
        <MyPostBox>
            {/* <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} id={props.data.id} /> */}
            {props.data.PostFiles.length > 0
                && props.data.PostFiles.length == 1 ?
                props.data.PostFiles.map((file: any) => (
                    <MyPostImage src={`http://${Env.HOST}:${Env.PORT}/images/posts/` + file.fileName} className="" />
                ))
                : <IonSlides options={slideOpts} style={{ width: "90vw" }}>
                    {props.data.PostFiles.map((file: any) => (
                        <IonSlide>
                            <MyPostImage src={`http://${Env.HOST}:${Env.PORT}/images/posts/` + file.fileName} className="" />
                        </IonSlide>
                    ))
                    }
                </IonSlides>
            }
        </MyPostBox>
    );
}
const MyPostTextComponent: React.FC<{ data: any }> = (props) => {
    const [actionSheet, setActionSheet] = useState(false);
    return (
        <IonCard style={{ margin: "4px 0" }}>
            <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} id={props.data.id} />
            <IonCardHeader>
                <div className="post-header">
                    <div className="post-profile ">
                        <IonImg src={process.env.PUBLIC_URL + "/assets/img/avatar.png"} className="rounded-circle" id="post-profile-img" />
                        <div className="name text-start">
                            <h6 className="">{props.data.User ? props.data.User.username : "kosong"}</h6>
                            <p className="small">{props.data.privacy}</p>
                        </div>
                    </div>
                    <IonIcon style={{ fontSize: "24px" }} icon={ellipsisVerticalSharp} onClick={() => { setActionSheet(true) }}></IonIcon>
                </div>
            </IonCardHeader>

            <IonCardContent className="post-content">
                <p> {props.data.caption}</p>
            </IonCardContent>
            <CardFooter>
                <IonButton color={'light'}>
                    <Icon slot='start' icon={thumbsUpSharp}></Icon>
                    <Label>10k</Label>
                </IonButton>
                <IonButton color={'light'}>
                    <Icon slot='start' icon={chatbubblesSharp}></Icon>
                    <Label>10k</Label>
                </IonButton>
            </CardFooter>
        </IonCard >
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

export { Post, PostShort, MyPostComponent, MyPostTextComponent };
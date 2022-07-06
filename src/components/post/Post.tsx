import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonLabel, IonSlide, IonSlides, IonText } from '@ionic/react';
import { arrowRedoOutline, cameraOutline, chatbubbleEllipsesOutline, chatbubblesOutline, chatbubblesSharp, ellipsisVerticalSharp, globeSharp, thumbsUpOutline, thumbsUpSharp, warningOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AssetsApi from '../../helpers/assets-api_helper';
import { ActionSheet, ActionSheetPublic } from '../Menu';
import { IconSM } from '../Utils/element/icon';
import Item from '../Utils/element/item';
import Color from '../Utils/style/color';
import { PostContent } from './micro/post-content';
import { PostHeader } from './micro/post-header';
import './post.css';


const Icon = styled(IonIcon)`
    font-size: 24px;
    color: ${Color.primary.blue};
`;

const Label = styled(IonLabel)`
    font-family: inter sans-serif !important;
    font-size: 14px;
`;


const Post: React.FC<{ data: any, actionClick: () => void }> = (props) => {
    return (
        <IonCard style={{ margin: "4px 0" }}>
            {props.children}
            <IonCardHeader>
                <PostHeader
                    image={props.data.User.image}
                    username={props.data.User.username}
                    privacy={props.data.privacy}
                    onClickMore={props.actionClick}
                />
            </IonCardHeader>
            <IonCardContent className="post-content">
                <PostContent
                    PostCategory={props.data.PostCategory}
                    PostFiles={props.data.PostFiles}
                    caption={props.data.caption}
                />
            </IonCardContent>
            <Item className='mt-3'>
                <IonButton slot='start' color={'light'}>
                    <IconSM color='primary' slot='start' icon={thumbsUpSharp}></IconSM>
                    <Label>10k</Label>
                </IonButton>
                <IonButton slot="end" color={'light'}>
                    <Icon color='primary' slot='start' icon={chatbubblesSharp}></Icon>
                    <Label>10k</Label>
                </IonButton>
            </Item>
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
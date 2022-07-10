import { IonCard, IonCardContent, IonCardHeader, IonIcon, IonImg, IonLabel } from '@ionic/react';
import { arrowRedoOutline, cameraOutline, chatbubbleEllipsesOutline, chatbubblesOutline, globeSharp, thumbsUpOutline, warningOutline } from 'ionicons/icons';
import { useState } from 'react';
import styled from 'styled-components';
import { getdataToken } from '../../interface/IdataToken';
import { ActionSheet, ActionSheetPublic } from '../Menu';
import Color from '../Utils/style/color';
import { PostContent } from './micro/post-content';
import { PostHeader } from './micro/post-header';
import { ResponsePost } from './micro/post-response';
import './post.css';


const Icon = styled(IonIcon)`
    font-size: 24px;
    color: ${Color.primary.blue};
`;

const Label = styled(IonLabel)`
    font-family: inter sans-serif !important;
    font-size: 14px;
`;


const Post: React.FC<{ data: any }> = (props) => {
    const [actionSheet, setActionSheet] = useState(false);
    const dataToken = getdataToken();
    return (
        <IonCard style={{ margin: "4px 0" }}>
            {dataToken?.userId == props.data.User.id
                ? (<ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} data={props.data} />)
                :
                <ActionSheetPublic show={actionSheet} onDidDismiss={() => setActionSheet(false)} idPost={props.data.id} />
            }
            {props.children}
            <IonCardHeader>
                <PostHeader
                    id={props.data.User.id}
                    image={props.data.User.image}
                    username={props.data.User.username}
                    privacy={props.data.privacy}
                    onClickMore={() => setActionSheet(true)}
                />
            </IonCardHeader>
            <IonCardContent className="post-content text-start">
                <PostContent
                    PostCategory={props.data.PostCategory}
                    PostFiles={props.data.PostFiles}
                    caption={props.data.caption}
                />
                <ResponsePost />
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
import { IonCol, IonGrid, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyApi from "../../helpers/my-api_helper";
import IAlert from "../../interface/IAlert";
import { AlertOk } from "../Alert";
import { Post } from "./Post";
import { BoxError } from "../Utils/style/box-error";
import { MyPostBox, MyPostImage, WhenClick } from "../Utils/custom/profile-post";
import AssetsApi from "../../helpers/assets-api_helper";
import PageShowPost from "../../pages/post/page-show-post";
import { useHistory } from "react-router";
import { ActionSheet } from "../Menu"

interface IPostByUser {
    id: number;
    caption: string;
    PostFiles: any;
}

const PostByUser: React.FC<{ idUser: number }> = (props) => {
    const api = new MyApi();
    const history = useHistory();
    const [post, setPost] = useState<IPostByUser[]>([]);
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });
    const [actionSheet, setActionSheet] = useState(false);
    useEffect(() => {
        api.getAllPostByUser(props.idUser).then((res) => {
            setPost(res.data.posts)
        }, err => {
            console.log(err);
        })
    }, [])
    const [value, setValue] = useState("0");
    const slider = useRef<HTMLIonSlidesElement>(null);
    const handleSegmentChange = (e: any) => {
        setValue(e.detail.value);
        slider.current!.slideTo(e.detail.value);
    };
    const slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop: false,
        pagination: {
            el: null
        },
    }
    const handleSlideChange = (e: any) => {
        slider.current?.getActiveIndex().then((e) => {
            setValue(`${e}`)
        })
    }

    const Slides = styled(IonSlides)`
        // height: calc(100vh - 120px);
        // overflow scroll;
    `;

    const showPost = (e: any) => {
        console.log(e);
        history.push("show-post", e);
    }
    return (
        <div>
            <AlertOk data={alert} />
            {post.length == 0
                ? (
                    <BoxError>Anda belum memiliki postingan</BoxError>
                )
                : <div style={{ width: "100vw" }}>
                    <IonSegment color="secondary" value={value} onIonChange={(e) => handleSegmentChange(e)}>
                        <IonSegmentButton value="0">
                            <p>Media</p>
                        </IonSegmentButton>
                        <IonSegmentButton value="1">
                            <p>Text</p>
                        </IonSegmentButton>
                    </IonSegment >
                    <Slides options={slideOpts} ref={slider} onIonSlideDidChange={handleSlideChange}>
                        <IonSlide>
                            <IonGrid>
                                <IonRow className="ion-justify-content-start">
                                    {post.map((e, i) =>
                                        e.PostFiles.length > 0 && (
                                            <IonCol key={i} size="4" sizeMd="3" sizeLg="2">
                                                <MyPostBox onClick={() => showPost(e)}>
                                                    {e.PostFiles.length > 0
                                                        && e.PostFiles.length == 1 ?
                                                        e.PostFiles.map((file: any, i: any) => (
                                                            <MyPostImage key={i} src={`${AssetsApi.URLImgPost}/${file.fileName}`} className="" />
                                                        ))
                                                        : <IonSlides options={slideOpts} style={{ width: "90vw" }}>
                                                            {e.PostFiles.map((file: any, i: any) => (
                                                                <IonSlide key={i}>
                                                                    <MyPostImage src={`${AssetsApi.URLImgPost}/${file.fileName}`} className="" />
                                                                </IonSlide>
                                                            ))
                                                            }
                                                        </IonSlides>
                                                    }
                                                </MyPostBox>
                                            </IonCol>
                                        )
                                    )}
                                </IonRow>
                            </IonGrid>
                        </IonSlide>
                        <IonSlide className="d-block">
                            {post.map((e, i) =>
                                !e.PostFiles.length && (
                                    <div key={i} className="my-3 shadow">
                                        <Post data={e} >
                                            <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} data={e} />
                                        </Post>
                                    </div>
                                )
                            )}
                        </IonSlide>
                    </Slides>
                </div>
            }
        </div>
    );
}

export default PostByUser;
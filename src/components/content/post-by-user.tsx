import { IonCol, IonGrid, IonRow, IonSegment, IonSegmentButton, IonSlide, IonSlides, useIonViewDidEnter } from "@ionic/react";
import { airplane, logoVimeo, newspaperOutline, pieChartSharp, ribbonSharp, text } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import MyApi from "../../helpers/my-api";
import IAlert from "../../interface/IAlert";
import { AlertOk } from "../Alert";
import { MyPostComponent, MyPostTextComponent, Post } from "../post/Post";
import { BoxError } from "../Utils/element/box-error";
import { IconSM } from "../Utils/element/icon";
import { Segment } from "../Utils/element/segment";

interface IPostByUser {
    id: number;
    caption: string;
    PostFiles: any;
}

const PostByUser: React.FC<{ idUser: number }> = (props) => {
    const api = new MyApi();
    const [post, setPost] = useState<IPostByUser[]>([]);
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });
    useEffect(() => {
        api.getAllPostByUser(props.idUser).then((res) => {
            // console.log(res.data.posts[0].PostFiles)
            setPost(res.data.posts)
        }, err => {
            console.log(err);
        })
    }, [])
    // post.map((e) => {
    //     console.log(e.PostFiles.length);
    // })
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
    return (
        <div>
            <AlertOk data={alert} />
            {!post
                ? (

                    <BoxError>404 NOT FOUND</BoxError>
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
                    <IonSlides options={slideOpts} ref={slider} onIonSlideDidChange={handleSlideChange}>
                        <IonSlide>
                            <IonGrid>
                                <IonRow className="ion-justify-content-between">
                                    {post.map((e) =>
                                        e.PostFiles.length > 0 && (
                                            <IonCol size="4">
                                                <MyPostComponent data={e} />
                                            </IonCol>
                                        )
                                    )}
                                </IonRow>
                            </IonGrid>
                        </IonSlide>
                        <IonSlide className="d-block">
                            {post.map((e) =>
                                !e.PostFiles.length && (
                                    <div className="my-3 shadow">
                                        <MyPostTextComponent data={e} />
                                    </div>
                                )
                            )}
                        </IonSlide>
                    </IonSlides>
                </div>
            }
        </div>
    );
}

export default PostByUser;
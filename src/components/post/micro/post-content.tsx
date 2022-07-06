import { IonImg, IonSlide, IonSlides, IonText, useIonViewWillEnter } from "@ionic/react";
import React, { useRef } from "react";
import AssetsApi from "../../../helpers/assets-api_helper";

interface IPostContent {
    caption: string;
    PostCategory: {
        category: string
    }
    PostFiles: [
        {
            fileName: string;
        }
    ]
}

export const PostContent: React.FC<IPostContent> = (props) => {
    const slideOpts = {
        speed: 500,
        effect: 'flip',
        nested: true,
    }

    const slides = useRef<HTMLIonSlidesElement>(null);
    useIonViewWillEnter(() => {
        slides.current?.startAutoplay();
    })

    return (
        <div>
            {props.PostFiles.length > 0
                ? props.PostFiles.length == 1
                    ? (<IonImg src={`${AssetsApi.URLImgPost}/${props.PostFiles[0].fileName}`} className="" />)
                    : <div>
                        <IonSlides pager={true} options={slideOpts} ref={slides} onIonSlideDidChange={(e) => e.target.stopAutoplay()} style={{ width: "90vw" }}>
                            {props.PostFiles.map((file: any, i: any) => (
                                <IonSlide key={i}>
                                    <IonImg src={`${AssetsApi.URLImgPost}/${file.fileName}`} className="" />
                                </IonSlide>
                            ))
                            }
                        </IonSlides>
                        <IonText>{props.caption}</IonText>
                    </div>
                : <IonText>{props.caption}</IonText>
            }
        </div>
    )
}
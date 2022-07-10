import { IonPage, IonToolbar, IonTitle, IonButton, IonSelectOption, IonLoading, IonIcon, IonLabel, useIonViewWillEnter, IonHeader } from "@ionic/react";
import styled from "styled-components";
import { ItemInput, Select, TextArea } from "../../components/Utils/style/Input";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import React, { useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router";
import Item from "../../components/Utils/style/item";
import Label from "../../components/Utils/style/label";
import { IconMD } from "../../components/Utils/style/icon";
import { camera, sendSharp } from "ionicons/icons";
import { navigate } from '../../helpers/navigation_helper'
import MyApi from "../../helpers/my-api_helper";
import { AlertOk } from "../../components/Alert";
import Content from "../../components/Utils/style/content";
import { SliderImage } from "../../components/image-slider";
import { TakePictures } from '../../helpers/camera_helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert2 from "../../components/element/Alert";

const BoxInput = styled.div`
    margin: 72px 16px 16px;
`;

const ButtonSubmit = styled(IonButton)`
   
`;

type Inputs = {
    privacy: string
    categoryId: number
    caption: string
};

const schema = yup.object().shape({
    privacy: yup.string().required("wajib di isi"),
    categoryId: yup.number().required("wajib di isi"),
    caption: yup.string()
}).required();


const api = new MyApi();
const PageCreatePost: React.FC = () => {
    const { photos, photosAsBlob, takePhoto } = TakePictures()
    const [listCategory, setListCategory] = useState<any[]>([]);
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    const { alert, setAlertSuccess, setAlertFail } = Alert2();
    const btnSubmit = useRef<HTMLIonButtonElement>(null);
    useIonViewWillEnter(() => {
        api.getAllpostCategory().then((res) => {
            setListCategory(res.data.categories)
        })
    })
    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });
    const form = useRef<HTMLFormElement>(null)

    /**
     *
     * @param data
     */

    const onSubmit = (data: any, event: any) => {
        setShowLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(photosAsBlob);
        if (photosAsBlob.length > 0) {
            photosAsBlob.forEach((value) => {
                formData.append("postFiles", value);
                console.log(formData.get("postFiles"))
            })
        }
        api.uploadPost(formData).then((res) => {
            setAlertSuccess({
                msg: res.data.msg,
                okClick: () => {
                    navigate("/post")
                }
            })
        }, err => {
            console.log(err.response.data);
            try {
                setAlertFail(
                    {
                        msg: err.response.data.errors[0].msg
                    }
                )
            } catch (error) {
                setAlertFail(
                    {
                        msg: err.response.data
                    }
                )
            }
        }).finally(() => {
            setShowLoading(false);
        })

    };

    const triggerSubmit = () => {
        btnSubmit.current?.click();
    }
    return (
        <IonPage>
            <IonHeader className="fixed-top">
                <ToolBarWithGoBack backTo={() => history.goBack()} title="Create Post" >
                    <IconMD icon={sendSharp} slot="end" onClick={triggerSubmit} />
                </ToolBarWithGoBack>
            </IonHeader>
            <Content fullscreen>
                <AlertOk data={alert} />
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <BoxInput>
                    <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                        <div className='d-flex justify-content-center align-items-center mb-2'>
                            <IonButton onClick={takePhoto}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
                            <SliderImage data={photos} />
                        </div>
                        <Item>
                            <Label position={getValues().categoryId ? "stacked" : "floating"}>kategori</Label>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...register("categoryId")}
                                        placeholder={"Select One"}
                                        value={field.value}
                                        className="my-3"
                                        onIonChange={e => setValue('categoryId', e.detail.value)}>
                                        {listCategory.map((val, i) => (
                                            <IonSelectOption key={i} value={`${val.id}`}>{val.category}</IonSelectOption>
                                        ))}
                                    </Select>
                                )}
                                control={control}
                                name="categoryId"
                                rules={{ required: 'Wajib di isi' }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="categoryId"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().privacy ? "stacked" : "floating"}>privacy</Label>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        {...register("privacy")}
                                        placeholder={"Select One"}
                                        value={field.value}
                                        className="my-3"
                                        onIonChange={e => setValue('privacy', e.detail.value)}>\
                                        <IonSelectOption value="public">public</IonSelectOption>
                                        <IonSelectOption value="only-friends">only friends</IonSelectOption>
                                        <IonSelectOption value="private">private</IonSelectOption>
                                    </Select>
                                )}
                                control={control}
                                name="privacy"
                                rules={{ required: 'Wajib di isi' }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="privacy"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <ItemInput>
                            <Label position={getValues().caption ? "stacked" : "floating"}>caption</Label>
                            <TextArea className="mt-3" rows={9}
                                {...register("caption")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="caption"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </ItemInput>
                        <ButtonSubmit type="submit" ref={btnSubmit} hidden />
                    </form>
                </BoxInput>
            </Content>
        </IonPage>
    )
}

export default PageCreatePost;
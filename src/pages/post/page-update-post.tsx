import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonSelectOption, IonLoading, IonIcon, IonLabel, useIonViewWillEnter, IonInput } from "@ionic/react";
import styled from "styled-components";
import { ItemInput, Select, TextArea } from "../../components/Utils/element/Input";
import ToolBarWithGoBack from "../../components/Utils/element/toolbar";
import React, { useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory, useLocation } from "react-router";
import Item from "../../components/Utils/element/item";
import Label from "../../components/Utils/element/label";
import { IconMD } from "../../components/Utils/element/icon";
import { camera, sendSharp } from "ionicons/icons";
import { navigate } from '../../helpers/navigation_helper'
import MyApi from "../../helpers/my-api_helper";
import { AlertOk } from "../../components/Alert";
import IAlert from "../../interface/IAlert";
import Content from "../../components/Utils/element/content";
import { SliderImage } from "../../components/image-slider";
import { Camera, CameraResultType } from "@capacitor/camera";
import { dataURItoBlob } from "../../helpers/converter_helper";

const BoxInput = styled.div`
    margin: 72px 16px 16px;
`;

const ButtonSubmit = styled(IonButton)`
   
`;

const api = new MyApi();
const PageUpdatePost: React.FC = () => {
    const [listCategory, setListCategory] = useState<any[]>([]);
    const [files, setFiles] = useState<Blob[]>([])
    const [filesPrev, setFilesPrev] = useState<any[]>([])
    const history = useHistory();
    const location = useLocation();
    const [showLoading, setShowLoading] = useState(false);
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });
    const post: any = location.state;
    const btnSubmit = useRef<HTMLIonButtonElement>(null);
    useIonViewWillEnter(() => {
        api.getAllpostCategory().then((res) => {
            setListCategory(res.data.categories)
        })

        if (post.PostFiles) {
            setFilesPrev([...files, post.PostFiles])
        }
    })
    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: post.id,
            categoryId: `${post.categoryId}`,
            privacy: post.privacy,
            caption: post.caption
        }
    });

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURItoBlob(cameraResult.dataUrl);
            setFiles([...files, convert]);
            setFilesPrev([...filesPrev, cameraResult.dataUrl]);
        } catch (e: any) {
            // console.log(e);
        }
    }
    const form = useRef<HTMLFormElement>(null)

    /**
     *
     * @param data
     */

    const onSubmit = (data: any) => {
        setShowLoading(true);
        const formData = new FormData(form.current as any);
        formData.append(data, JSON.stringify(data));
        if (files.length > 1) {
            files.forEach((value) => {
                formData.append("postFiles", value);
            })
        }
        api.updatePost(formData).then((res) => {
            setAlert({
                showAlert: true,
                header: "Berhasil",
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                type: "success",
                message: res.data.msg,
                okClick: () => {
                    navigate("/profile");
                }
            })
        }, err => {
            setAlert({
                showAlert: true,
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                header: "Gagal",
                type: "failed",
                message: err.response.data.msg,
                okClick: () => { setAlert({ showAlert: false }) }
            })
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
                <ToolBarWithGoBack backTo={() => history.goBack()} title={post ? "Update Post" : "Create Post"} >
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
                        <IonInput value={post.id} name="id" hidden></IonInput>
                        <div className='d-flex justify-content-center align-items-center mb-2'>
                            <IonButton onClick={takePicture}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
                            <SliderImage data={filesPrev} />
                        </div>
                        <Item>
                            <Label position={getValues().categoryId ? "stacked" : "floating"}>kategori</Label>
                            <Controller
                                render={({ field }) => (
                                    <Select
                                        placeholder={post.PostCategory.category ?? "Select One"}
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
                                        placeholder="Select One"
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
                            <TextArea className="mt-3" rows={9} required
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

export default PageUpdatePost;
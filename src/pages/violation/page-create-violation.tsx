import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ItemInput, Select } from '../../components/Utils/style/Input';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonSelectOption, IonTextarea, RefresherEventDetail, useIonAlert, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { TakePictures } from '../../helpers/camera_helper';
import MyApi from '../../helpers/my-api_helper';
import { useHistory, useLocation } from 'react-router';
import { dataURItoBlob } from '../../helpers/converter_helper';
import styled from 'styled-components';
import { Header } from '../../components/Utils/style/header';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { addSharp, imageOutline, saveOutline, text } from 'ionicons/icons';
import { ErrorMessage } from '@hookform/error-message';
import Label from '../../components/Utils/style/label';
import { IconToolbar } from '../../components/Utils/style/icon';
import { AlertOk } from '../../components/Alert';
import Alert2 from '../../components/element/Alert';
import { ModalCreateCategory } from '../../components/element/modal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { navigate } from '../../helpers/navigation_helper';
import AssetsApi from '../../helpers/assets-api_helper';

type IEbook = {
    feature: string
    featureId: string
    description: string
};
const schema = yup.object().shape({
    feature: yup.string().required("wajib di isi"),
    featureId: yup.string().required("wajib di isi"),
    description: yup.string().required("wajib di isi"),
}).required();

const api = new MyApi();


export const PageCreateViolation: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const location = useLocation();
    const featureId: any = location.state
    const { control, register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<IEbook>({
        defaultValues: {
            feature: 'post',
            featureId: featureId ? `${featureId}` : '',
            description: '',
        },
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const mySubmit = (data: any, e: any) => {
        e.preventDefault();
        api.createViolation(data).then((res) => {
            presentAlert({
                header: "Berhasil",
                message: res.data.msg,
                cssClass: "custom-alert text-center alert-success",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            navigate("post");
                        }

                    }
                ]
            })
        }, err => {
            presentAlert({
                header: "Gagal",
                message: err.response.data.msg ?? err.response.data.errors[0].msg,
                cssClass: "custom-alert text-center alert-failed",
                buttons: [
                    {
                        text: "OK",
                    }
                ]
            })
        })

    }


    const btnSubmit = useRef<HTMLIonButtonElement>(null);

    const submitClick = () => {
        btnSubmit.current?.click();
    }

    const BoxFoto = styled.div`

    `;

    const Myform = styled.form`
        padding: 2rem;
    `;
    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        window.location.reload();
        event.detail.complete();
    }
    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.go(-1)} title="Laporkan postingan">
                    <IconToolbar style={{ margin: "0" }} slot='end' icon={saveOutline} onClick={submitClick}></IconToolbar>
                </ToolBarWithGoBack>
            </Header>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <Myform onSubmit={handleSubmit(mySubmit)}>
                    <ItemInput hidden>
                        <Label position='stacked' style={{}}>Feature</Label>
                        <IonInput {...register("feature")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="feature"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput hidden>
                        <Label position='stacked' style={{}}>FeatureId</Label>
                        <IonInput {...register("featureId")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="featureId"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Deskripsi Laporan</Label>
                        <IonTextarea rows={10} {...register("description")}></IonTextarea>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="description"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonButton type="submit" ref={btnSubmit} hidden>Submit</IonButton>
                </Myform>
            </IonContent>
        </IonPage>
    );
};
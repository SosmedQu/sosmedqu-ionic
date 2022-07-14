import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ItemInput, Select } from '../../components/Utils/style/Input';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelectOption, IonTextarea, useIonAlert, useIonModal, useIonViewWillEnter } from '@ionic/react';
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
    labelName: string
    color: string
    title: string
    description: string
};
const schema = yup.object().shape({
    labelName: yup.string().matches(/^[a-z\d\-_\s]+$/i, 'special carackter dilarang'),
    color: yup.string().required("wajib di pilih"),
    title: yup.string().required("wajib di isi"),
    description: yup.string().required("wajib di isi"),
}).required();

const api = new MyApi();


export const PageCUNote: React.FC = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();
    const location = useLocation();
    const note: any = location.state
    const { control, register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<IEbook>({
        defaultValues: {
            labelName: note ? note.LabelNote.labelName : '',
            color: note ? note.LabelNote.color : '',
            title: note ? note.title : '',
            description: note ? note.description : '',
        },
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const mySubmit = (data: any, e: any) => {
        e.preventDefault();
        if (note) {
            data["id"] = note.id
            console.log(data);
            api.updateNote(data).then((res) => {
                presentAlert({
                    header: "Berhasil",
                    message: res.data.msg,
                    cssClass: "custom-alert text-center alert-success",
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.goBack();
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
        } else {
            api.createNote(data).then((res) => {
                presentAlert({
                    header: "Berhasil",
                    message: res.data.msg,
                    cssClass: "custom-alert text-center alert-success",
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                navigate("notequ");
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
    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.go(-1)} title={note ? 'Rubah Jadwal' : 'Buat Jadwal'}>
                    <IconToolbar style={{ margin: "0" }} slot='end' icon={saveOutline} onClick={submitClick}></IconToolbar>
                </ToolBarWithGoBack>
            </Header>
            <IonContent>
                <Myform onSubmit={handleSubmit(mySubmit)}>
                    <ItemInput>
                        <Label position='stacked' style={{}}>Label NoteQu</Label>
                        <IonInput {...register("labelName")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="labelName"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Warna Label</Label>
                        <input type='color' {...register("color")}></input>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="color"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Judul NoteQu</Label>
                        <IonInput {...register("title")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="title"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>description</Label>
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
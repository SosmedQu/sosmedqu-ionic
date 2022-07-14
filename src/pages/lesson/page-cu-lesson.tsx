import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ItemInput, Select } from '../../components/Utils/style/Input';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelectOption, IonTextarea, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { TakePictures } from '../../helpers/camera_helper';
import MyApi from '../../helpers/my-api_helper';
import { useHistory, useLocation } from 'react-router';
import { dataURItoBlob } from '../../helpers/converter_helper';
import styled from 'styled-components';
import { Header } from '../../components/Utils/style/header';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { addSharp, imageOutline, saveOutline } from 'ionicons/icons';
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
    subject: string
    dayId: string
    hour: string
    teacher: string
    class: string
    semester: string
};
const schema = yup.object().shape({
    subject: yup.string().matches(/^[a-z\d\-_\s]+$/i, 'special carackter dilarang'),
    dayId: yup.string().required("wajib di pilih"),
    hour: yup.string().required("wajib di isi"),
    teacher: yup.string().required("wajib di isi"),
    class: yup.string().required("wajib di isi"),
    semester: yup.string().required('wajib di isi'),
}).required();

const api = new MyApi();


export const PageCULesson: React.FC = () => {
    const history = useHistory();
    const { alert, setAlertSuccess, setAlertFail } = Alert2();
    const [listDays, setListDays] = useState<any[]>([]);
    const location = useLocation();
    const subject: any = location.state
    const { photo, takePhoto } = TakePictures();
    useIonViewWillEnter(() => {
        api.getAllDay().then((res) => {
            setListDays(res.data.days)
        })
    })

    const { control, register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<IEbook>({
        defaultValues: {
            subject: subject ? subject.subject : '',
            dayId: subject ? `${subject.dayId}` : '',
            hour: subject ? subject.hour : '',
            class: subject ? subject.class : '',
            semester: subject ? subject.semester : null,
            teacher: subject ? subject.teacher : ''
        },
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const [present, dismiss] = useIonModal(ModalCreateCategory, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
    });

    const mySubmit = (data: any, e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (photo) {
            const convert: Blob = dataURItoBlob(photo);
            formData.append("subjectImage", convert);
        }
        if (subject) {
            formData.append("id", subject.id)
            formData.append("oldImage", subject.image);
            api.updateSubject(formData).then((res) => {
                setAlertSuccess({ msg: res.data.msg, okClick: () => history.go(-1) })
            }, err => {
                console.log(err)
                try {
                    setAlertFail(err.response.data.errors[0].msg);
                } catch (error) {
                    console.log(err)
                }
            })
        } else {
            api.uploadSubject(formData).then((res) => {
                setAlertSuccess({ msg: res.data.msg, okClick: () => history.go(-1) })
            }, err => {
                console.log(err)
                try {
                    setAlertFail(err.response.data.errors[0].msg);
                } catch (error) {
                    console.log(err)
                }
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
                <ToolBarWithGoBack backTo={() => history.go(-1)} title={subject ? 'Rubah Jadwal' : 'Buat Jadwal'}>
                    <IconToolbar style={{ margin: "0" }} slot='end' icon={saveOutline} onClick={submitClick}></IconToolbar>
                </ToolBarWithGoBack>
            </Header>
            <IonContent>
                <AlertOk data={alert} />
                <Myform onSubmit={handleSubmit(mySubmit)}>
                    <BoxFoto>
                        <IonImg src={photo ? photo : (subject && `${AssetsApi.URLImgSubject}/${subject.image}`)}></IonImg>
                    </BoxFoto>
                    <div className='d-flex justify-content-center my-3'>
                        <IonButton onClick={takePhoto}>
                            <IonIcon slot="start" icon={imageOutline} />
                            <IonLabel>Foto</IonLabel>
                        </IonButton>
                        {/* <IonButton onClick={handleUpload}>
                            <IonIcon slot="start" icon={documentAttachOutline} />
                            <IonLabel>Pdf E-book {pdf ? (<span style={{ color: "green", fontWeight: "bold" }}>✔</span>) : null}</IonLabel>
                        </IonButton> */}
                    </div>
                    <ItemInput>
                        <Label position='stacked' style={{}}>Nama Jadwal</Label>
                        <IonInput {...register("subject")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="subject"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position={getValues().dayId ? "stacked" : "floating"}>hari</Label>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...register("dayId")}
                                    placeholder={"Select One"}
                                    value={field.value}
                                    className="my-3"
                                    onIonChange={e => setValue('dayId', e.detail.value)}>
                                    {listDays.map((val, i) => (
                                        <IonSelectOption key={i} value={`${val.id}`}>{val.day}</IonSelectOption>
                                    ))}
                                </Select>
                            )}
                            control={control}
                            name="dayId"
                            rules={{ required: 'Wajib di isi' }}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="dayId"
                            as={<div style={{ color: 'red' }} />}
                        />
                    </ItemInput>
                    <ItemInput>
                        <Label position='stacked' style={{}}>Jam</Label>
                        <IonInput type='time' {...register("hour")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="hour"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Guru / Dosen</Label>
                        <IonInput {...register("teacher")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="teacher"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>class</Label>
                        <IonInput {...register("class")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="class"
                        as={<div style={{ color: 'red' }} />}
                    />

                    <ItemInput>
                        <Label position='stacked' style={{}}>semester</Label>
                        <IonInput type='number' {...register("semester")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="semester"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonButton type="submit" ref={btnSubmit} hidden>Submit</IonButton>
                </Myform>
            </IonContent>
        </IonPage>
    );
};
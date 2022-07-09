import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input, ItemInput, Select } from '../../components/Utils/style/Input';
import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelectOption, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { TakePictures } from '../../helpers/camera_helper';
import MyApi from '../../helpers/my-api_helper';
import { useHistory, useLocation } from 'react-router';
import { dataURItoBlob } from '../../helpers/converter_helper';
import AssetsApi from '../../helpers/assets-api_helper';
import styled from 'styled-components';
import { Header } from '../../components/Utils/style/header';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { addOutline, addSharp, camera, documentAttachOutline, image, imageOutline, saveOutline } from 'ionicons/icons';
import { ErrorMessage } from '@hookform/error-message';
import Label from '../../components/Utils/style/label';
import { IconToolbar } from '../../components/Utils/style/icon';
import { AlertOk } from '../../components/Alert';
import Alert2 from '../../components/element/Alert';
import Item from '../../components/Utils/style/item';
import { ModalCreateCategory } from '../../components/element/modal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

type IEbook = {
    name: string
    categoryId: string;
    description: string
    writer: string
    publisher: string
    publicationYear: string
    isbn: string
};
const SUPPORTED_FORMATS = [
    "application/pdf",
];
const schema = yup.object().shape({
    name: yup.string().matches(/^[a-z\d\-_\s]+$/i, 'special carackter dilarang'),
    categoryId: yup.string().required("wajib di pilih"),
    description: yup.string().required("wajib di isi"),
    writer: yup.string().required("wajib di isi"),
    publisher: yup.string().required("wajib di isi"),
    publicationYear: yup.string().required('wajib di isi'),
    isbn: yup.string().required('wajib di isi'),
}).required();

const api = new MyApi();


export const PageCreateEbook: React.FC = () => {
    const history = useHistory();
    const { alert, setAlertSuccess, setAlertFail } = Alert2();
    const [listCategory, setListCategory] = useState<any[]>([]);
    const { photo, takePhoto } = TakePictures();
    // const [pdf, setPdf] = useState();
    useIonViewWillEnter(() => {
        api.getEbookCategory().then((res) => {
            setListCategory(res.data.categories)
        })
    })

    const { control, register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<IEbook>({
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const uploadFile = useRef<HTMLInputElement>(null);
    const handleUpload = (e: any) => {
        uploadFile.current?.click();
        // setPdf(e.target?.files);
    }

    const [present, dismiss] = useIonModal(ModalCreateCategory, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
    });

    function openModal() {
        present({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'confirm') {
                    api.uploadEbookCategory({ category: ev.detail.data }).then((res) => {
                        setAlertSuccess({
                            msg: res.data.msg
                        })
                        api.getEbookCategory().then((res) => {
                            setListCategory(res.data.categories)
                        })
                    }, err => {
                        setAlertFail(err.response.data.msg)
                    })
                }
            },
        });
    }

    const mySubmit = (data: any, e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        console.log("category ID = " + data)
        if (photo) {
            const convert: Blob = dataURItoBlob(photo);
            formData.append("ebookImage", convert);
        }
        api.uploadEbook(formData).then((res) => {
            console.log(res.data);
            setAlertSuccess({ msg: res.data.msg, okClick: () => history.goBack() })
        }, err => {
            try {
                setAlertFail(err.response.data.errors[0]);
            } catch (error) {
                console.log(err)
            }
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
    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.go(-1)} title='Rubah Profile'>
                    <IconToolbar slot='end' icon={saveOutline} onClick={submitClick}></IconToolbar>
                </ToolBarWithGoBack>
            </Header>
            <IonContent>
                <AlertOk data={alert} />
                <Myform onSubmit={handleSubmit(mySubmit)}>
                    <BoxFoto>
                        <IonImg src={photo}></IonImg>
                    </BoxFoto>
                    <div className='d-flex justify-content-center my-3'>
                        <IonButton onClick={takePhoto}>
                            <IonIcon slot="start" icon={imageOutline} />
                            <IonLabel>Foto</IonLabel>
                        </IonButton>
                        <IonButton onClick={handleUpload}>
                            <IonIcon slot="start" icon={documentAttachOutline} />
                            <IonLabel>Pdf E-book <span style={{ color: "green", fontWeight: "bold" }}>✔</span></IonLabel>
                        </IonButton>
                    </div>
                    <input type={'file'} name="ebookFile" ref={uploadFile} accept="application/pdf" hidden onChange={(e) => handleUpload(e)} ></input>
                    <ItemInput>
                        <Label position='stacked' style={{}}>Judul E-book</Label>
                        <IonInput {...register("name")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
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
                    </ItemInput>
                    <IonItem lines='none' button color={'success'} onClick={openModal}>
                        <IonIcon slot='start' icon={addSharp}></IonIcon>
                        <IonLabel>tambah category jika belum ada</IonLabel>
                    </IonItem>
                    <ItemInput>
                        <Label position='stacked' style={{}}>Penulis</Label>
                        <IonInput {...register("writer")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="writer"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Publisher</Label>
                        <IonInput {...register("publisher")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="publisher"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Tahun Publish</Label>
                        <IonInput {...register("publicationYear")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="publicationYear"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>ISBN</Label>
                        <IonInput {...register("isbn")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="isbn"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Deskripsi</Label>
                        <IonInput {...register("description")}></IonInput>
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
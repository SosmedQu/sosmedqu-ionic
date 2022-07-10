import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ItemInput, Select } from '../../components/Utils/style/Input';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelectOption, useIonModal, useIonViewWillEnter } from '@ionic/react';
import { TakePictures } from '../../helpers/camera_helper';
import MyApi from '../../helpers/my-api_helper';
import { useHistory } from 'react-router';
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

type IEbook = {
    name: string
    categoryId: string
    description: string
    writer: string
    publisher: string
    publicationYear: string
    isbn: number
};
const schema = yup.object().shape({
    name: yup.string().matches(/^[a-z\d\-_\s]+$/i, 'special carackter dilarang'),
    categoryId: yup.string().required("wajib di pilih"),
    description: yup.string().required("wajib di isi"),
    writer: yup.string().required("wajib di isi"),
    publisher: yup.string().required("wajib di isi"),
    publicationYear: yup.string().required('wajib di isi'),
    isbn: yup.number().required('wajib di isi'),
}).required();

const api = new MyApi();


export const PageCreateEbook: React.FC = () => {
    const history = useHistory();
    const { alert, setAlertSuccess, setAlertFail } = Alert2();
    const [listCategory, setListCategory] = useState<any[]>([]);
    const { photo, takePhoto } = TakePictures();
    // const [pdf, setPdf] = useState<any>();
    useIonViewWillEnter(() => {
        api.getEbookCategory().then((res) => {
            setListCategory(res.data.categories)
        })
    })

    const { control, register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<IEbook>({
        // defaultValues: {
        //     categoryId: "1",
        //     name: "dummy",
        //     description: "dummy",
        //     isbn: 123456,
        //     publicationYear: "2013",
        //     publisher: "dummy",
        //     writer: "mydummy",
        // },
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

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
        if (photo) {
            const convert: Blob = dataURItoBlob(photo);
            formData.append("ebookImage", convert);
        }
        console.log(formData.get("ebookFile"));

        api.uploadEbook(formData).then((res) => {
            console.log(res.data);
            setAlertSuccess({ msg: res.data.msg, okClick: () => history.go(-1) })
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
                <ToolBarWithGoBack backTo={() => history.go(-1)} title='Upload E-book'>
                    <IconToolbar style={{ margin: "0" }} slot='end' icon={saveOutline} onClick={submitClick}></IconToolbar>
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
                        {/* <IonButton onClick={handleUpload}>
                            <IonIcon slot="start" icon={documentAttachOutline} />
                            <IonLabel>Pdf E-book {pdf ? (<span style={{ color: "green", fontWeight: "bold" }}>✔</span>) : null}</IonLabel>
                        </IonButton> */}
                    </div>
                    <ItemInput>
                        <Label position='stacked' style={{}}>PDF E-book</Label>
                        <input className='my-3' type={'file'} name="ebookFile" accept="application/pdf" ></input>
                    </ItemInput>
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
                        <Label position={getValues().publicationYear ? "stacked" : "floating"}>tahun publish</Label>
                        <Controller
                            render={({ field }) => (
                                <Select
                                    {...register("publicationYear")}
                                    placeholder={"Select One"}
                                    value={field.value}
                                    className="my-3"
                                    onIonChange={e => setValue('publicationYear', e.detail.value)}>
                                    <IonSelectOption value="2000">2000</IonSelectOption>
                                    <IonSelectOption value="2001">2001</IonSelectOption>
                                    <IonSelectOption value="2002">2002</IonSelectOption>
                                    <IonSelectOption value="2003">2003</IonSelectOption>
                                    <IonSelectOption value="2004">2004</IonSelectOption>
                                    <IonSelectOption value="2005">2005</IonSelectOption>
                                    <IonSelectOption value="2006">2006</IonSelectOption>
                                    <IonSelectOption value="2007">2007</IonSelectOption>
                                    <IonSelectOption value="2008">2008</IonSelectOption>
                                    <IonSelectOption value="2009">2009</IonSelectOption>
                                    <IonSelectOption value="2010">2010</IonSelectOption>
                                    <IonSelectOption value="2011">2011</IonSelectOption>
                                    <IonSelectOption value="2012">2012</IonSelectOption>
                                    <IonSelectOption value="2013">2013</IonSelectOption>
                                    <IonSelectOption value="2014">2014</IonSelectOption>
                                    <IonSelectOption value="2015">2015</IonSelectOption>
                                    <IonSelectOption value="2016">2016</IonSelectOption>
                                    <IonSelectOption value="2017">2017</IonSelectOption>
                                    <IonSelectOption value="2018">2018</IonSelectOption>
                                    <IonSelectOption value="2018">2018</IonSelectOption>
                                    <IonSelectOption value="2019">2019</IonSelectOption>
                                    <IonSelectOption value="2020">2020</IonSelectOption>
                                    <IonSelectOption value="2021">2021</IonSelectOption>
                                    <IonSelectOption value="2022">2022</IonSelectOption>
                                </Select>
                            )}
                            control={control}
                            name="publicationYear"
                            rules={{ required: 'Wajib di isi' }}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="publicationYear"
                            as={<div style={{ color: 'red' }} />}
                        />
                    </ItemInput>
                    <ItemInput>
                        <Label position='stacked' style={{}}>ISBN</Label>
                        <IonInput type='number' {...register("isbn")}></IonInput>
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
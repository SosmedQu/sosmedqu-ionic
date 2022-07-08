import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input, ItemInput } from '../../components/Utils/style/Input';
import Item from '../../components/Utils/style/item';
import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import { TakePictures } from '../../helpers/camera_helper';
import MyApi from '../../helpers/my-api_helper';
import { useHistory, useLocation } from 'react-router';
import { dataURItoBlob } from '../../helpers/converter_helper';
import AssetsApi from '../../helpers/assets-api_helper';
import styled from 'styled-components';
import { Header } from '../../components/Utils/style/header';
import { ToolBarWithGoBack } from '../../components/Utils/element/toolbar';
import { camera, save, saveOutline } from 'ionicons/icons';
import { ErrorMessage } from '@hookform/error-message';
import Label from '../../components/Utils/style/label';
import { IconMD, IconToolbar } from '../../components/Utils/style/icon';
import { AlertOk } from '../../components/Alert';
import Alert2 from '../../components/Utils/element/Alert';

type IGeneral = {
    oldImage: string;
    username: string;
};

const schema = yup.object().shape({
    username: yup.string().required("wajib di isi"),
    oldImage: yup.string(),
}).required();

const api = new MyApi();

export const PageUpdateGeneral: React.FC = () => {
    const { alert, setAlertSuccess, setAlertFail } = Alert2();
    const history = useHistory();
    const location = useLocation();
    const profile: any = location.state

    const { photo, takePhoto } = TakePictures();
    const { register, handleSubmit, formState: { errors } } = useForm<IGeneral>({
        defaultValues: {
            username: profile ? profile.username : ''
        },
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const mySubmit = (data: any, e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (photo) {
            const convert: Blob = dataURItoBlob(photo);
            formData.append("profileImage", convert);
        }
        api.updateProfile(formData).then((res) => {
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
    const PhotoIcon = styled(IonIcon)`
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
        color: red;
        width: 48px;
        height: 48px;
    `;

    const BoxFoto = styled(IonAvatar)`
        margin: 2rem 0; 
        position: relative;
        width: 200px;
        height: 200px;
        object-fit: cover;
    `;

    const Myform = styled.form`
        padding: 2rem;
    `;
    if (profile == undefined) return null;
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
                    <div className='d-flex justify-content-center'>
                        <BoxFoto>
                            <PhotoIcon onClick={takePhoto} icon={camera}></PhotoIcon>
                            <IonImg src={photo ?? `${AssetsApi.URLImgProfile}/${profile.image}`}></IonImg>
                        </BoxFoto>
                    </div>
                    <Input {...register("oldImage")} value={profile.image} hidden />
                    <ItemInput>
                        <Label position='stacked' style={{}}>Username</Label>
                        <IonInput {...register("username")}></IonInput>
                    </ItemInput>
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        as={<div style={{ color: 'red' }} />}
                    />
                    <IonButton type="submit" ref={btnSubmit} hidden>Submit</IonButton>
                </Myform>
            </IonContent>
        </IonPage>
    );
};
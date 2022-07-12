import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonSelectOption, IonLoading, IonIcon, IonLabel, IonCol, IonImg } from "@ionic/react";
import styled from "styled-components";
import { Input, Select } from "../../components/Utils/style/Input";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory, useLocation } from "react-router";
import Item from "../../components/Utils/style/item";
import Label from "../../components/Utils/style/label";
import { FDUpgradeStudent } from "../../formData/FD_upgrade-student";
import { IconMD } from "../../components/Utils/style/icon";
import { camera, sendSharp } from "ionicons/icons";
import { navigate } from '../../helpers/navigation_helper'
import MyApi from "../../helpers/my-api_helper";
import { AlertOk } from "../../components/Alert";
import IAlert from "../../interface/IAlert";
import Content from "../../components/Utils/style/content";
import { TakePictures } from '../../helpers/camera_helper';
import { dataURItoBlob } from "../../helpers/converter_helper";
const BoxInput = styled.div`
    margin: 64px 16px 16px;
`;



const UpgradeStudent: React.FC = () => {
    document.title = "Upgrade Student";
    // const [notvalid, setNotValid] = useState<any>()
    const [showLoading, setShowLoading] = useState(false);
    const [dataAlert, setDataAlert] = useState<IAlert>({ showAlert: false });
    const history = useHistory();

    const location = useLocation();
    const { photo, takePhoto } = TakePictures();
    const profile: any = location.state;
    let date = profile ? new Date(profile.birthDay) : new Date();
    const btnSubmit = useRef<HTMLIonButtonElement>(null);

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: profile ? profile.username : '',
            gender: profile ? profile.gender : '',
            placeOfBirth: profile ? profile.placeOfBirth : '',
            birthDay: date.toLocaleDateString('en-CA'),
            noHp: profile ? profile.noHp : '',
            email: profile ? profile.email : '',
            nisn: profile ? profile.nisn : '',
            studyAt: profile ? profile.studyAt : '',
            province: profile ? profile.province : '',
        }
    });


    /**
     *
     * @param data
     */
    const onSubmit = (data: any, event: any) => {
        event.preventDefault();
        setShowLoading(true);
        console.log(data);
        if (profile.roleId == 2) {
            history.replace("/profile", profile)
        }
        const formData = new FormData(event.target);
        if (photo) {
            const convert = dataURItoBlob(photo)
            console.log(convert)
            formData.append('studentCard', convert);
        }
        const api = new MyApi();
        api.upgradeStudent(formData).then((res) => {
            console.log(res)
            setDataAlert({
                showAlert: true,
                header: "Berhasil",
                onDidDismiss: () => { setDataAlert({ showAlert: false }) },
                type: "success",
                message: res.data.msg,
                okClick: () => {
                    navigate("/profile");
                }
            })
        }, err => {
            console.log(err.response);
            setDataAlert({
                showAlert: true,
                onDidDismiss: () => { setDataAlert({ showAlert: false }) },
                header: "Gagal",
                type: "failed",
                message: err.response.data.errors[0].msg,
                okClick: () => { setDataAlert({ showAlert: false }) }
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
            <IonHeader className="sticky-top">
                <ToolBarWithGoBack backTo={() => history.replace("/profile")} title="Upgrade To Student" >
                    <IconMD icon={sendSharp} slot="end" onClick={triggerSubmit} />
                </ToolBarWithGoBack>
            </IonHeader>
            <Content fullscreen>
                <AlertOk data={dataAlert} />
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='d-flex flex-column align-items-center mb-2'>
                            <IonCol size="6">
                                {photo != undefined && (
                                    <IonImg src={photo} />
                                )}
                            </IonCol>
                            <IonButton onClick={takePhoto}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Kartu Pelajar</IonLabel>
                            </IonButton>
                        </div>
                        <Item>
                            <Label position={getValues().email ? "stacked" : "floating"}>email</Label>
                            <Input readonly
                                {...register("email")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().username ? "stacked" : "floating"}>Username</Label>
                            <Input
                                {...register("username", FDUpgradeStudent.username)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="username"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().placeOfBirth ? "stacked" : "floating"}>Tempat Lahir</Label>
                            <Input
                                {...register("placeOfBirth", FDUpgradeStudent.placeOfBirth)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="placeOfBirth"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().birthDay ? "stacked" : "floating"}>Tanggal lahir</Label>
                            <Input
                                type="date" {...register("birthDay", FDUpgradeStudent.birthDay)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="birthDay"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().gender ? "stacked" : "floating"}>jenis Kelamin</Label>
                            <Controller
                                render={({ field }) => (
                                    <Select {...register("gender")}
                                        placeholder="Select One"
                                        value={field.value}
                                        onIonChange={e => setValue('gender', e.detail.value)}>
                                        <IonSelectOption value="laki-laki">Laki laki</IonSelectOption>
                                        <IonSelectOption value="perempuan">Perempuan</IonSelectOption>
                                    </Select>
                                )}
                                control={control}
                                name="gender"
                                rules={{ required: 'Wajib di isi' }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="gender"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().noHp ? "stacked" : "floating"}>No HandPhone</Label>
                            <Input
                                {...register("noHp")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="noHp"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().nisn ? "stacked" : "floating"}>NISN</Label>
                            <Input
                                type="number"
                                {...register("nisn", FDUpgradeStudent.nisn)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="nisn"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().studyAt ? "stacked" : "floating"}>studyAt</Label>
                            <Input
                                {...register("studyAt", FDUpgradeStudent.studyAt)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="studyAt"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <Item>
                            <Label position={getValues().province ? "stacked" : "floating"}>province</Label>
                            <Input
                                {...register("province", FDUpgradeStudent.province)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="province"
                                as={<div style={{ color: 'red' }} />}
                            />
                        </Item>
                        <IonButton type="submit" ref={btnSubmit} hidden />
                    </form>
                </BoxInput>
            </Content>
        </IonPage>
    )
}

export default UpgradeStudent;
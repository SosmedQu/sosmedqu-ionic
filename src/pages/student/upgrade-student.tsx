import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSelect, IonSelectOption, IonLoading, IonIcon, IonLabel } from "@ionic/react";
import styled from "styled-components";
import { Input, Select } from "../../components/Utils/element/Input";
import ToolBarWithGoBack from "../../components/Utils/element/toolbar";
import React, { useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory, useLocation } from "react-router";
import Item from "../../components/Utils/element/item";
import Label from "../../components/Utils/element/label";
import { FDUpgradeStudent } from "../../formData/FD_upgrade-student";
import { IconMD } from "../../components/Utils/element/icon";
import { camera, sendSharp } from "ionicons/icons";
import { navigate } from '../../helpers/navigation_helper'
import MyApi from "../../helpers/my-api_helper";
import { AlertOk } from "../../components/Alert";
import IAlert from "../../interface/IAlert";
import Content from "../../components/Utils/element/content";
import { Camera, CameraResultType } from "@capacitor/camera";
import { dataURItoBlob } from "../../helpers/converter_helper";
import { SliderImage } from "../../components/image-slider";

const BoxInput = styled.div`
    margin: 64px 16px 16px;
`;

const ButtonSubmit = styled(IonButton)`
   
`;



const UpgradeStudent: React.FC = () => {
    const [notvalid, setNotValid] = useState<any>()
    const [showLoading, setShowLoading] = useState(false);
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });
    const [file, setFile] = useState<any>();
    const [filePrev, setFilePrev] = useState<any[]>([]);
    const history = useHistory();
    const location = useLocation();
    const profile: any = location.state;
    let date = new Date(profile.birthDay)
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
            username: profile.username,
            gender: profile.gender,
            placeOfBirth: profile.placeOfBirth,
            birthDay: date.toLocaleDateString('en-CA'),
            noHp: profile.noHp,
            email: profile.email,
            nisn: profile.nisn,
            studyAt: profile.studyAt,
            province: profile.province,
        }
    });
    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURItoBlob(cameraResult.dataUrl);
            setFile(convert);
            setFilePrev([cameraResult.dataUrl]);
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
        console.log(file);
        formData.append("studentCard", file);
        if (profile.roleId == 2) {
            history.replace("/profile", profile)
        }
        const api = new MyApi();
        api.upgradeStudent(data).then((res) => {
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
            // console.log(err.response.data.errors);
            setNotValid(err.response.data.errors)
            setAlert({
                showAlert: true,
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                header: "Gagal",
                type: "failed",
                message: err.response.data.errors.msg,
                okClick: () => { setAlert({ showAlert: false }) }
            })
        }).finally(() => {
            setShowLoading(false);
        })

    };
    console.log(notvalid);
    const triggerSubmit = () => {
        btnSubmit.current?.click();
    }
    return (
        <IonPage>
            <IonHeader className="fixed-top">
                <ToolBarWithGoBack backTo={() => history.goBack()} title="Upgrade To Student" >
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
                        <div className='d-flex flex-column align-items-center mb-2'>
                            <SliderImage data={filePrev} />
                            <IonButton onClick={takePicture}>
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
                                    <Select
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
                        <ButtonSubmit type="submit" ref={btnSubmit} hidden />
                    </form>
                </BoxInput>
            </Content>
        </IonPage>
    )
}

export default UpgradeStudent;
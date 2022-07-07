import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonCheckbox, IonDatetime, IonRadio, IonRadioGroup, IonRange, IonSelect, IonSelectOption, IonText, IonToggle } from "@ionic/react";
import styled from "styled-components";
import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ToolBarWithGoBack } from "../components/Utils/element/toolbar";
import { useHistory } from "react-router";

const BoxInput = styled.div`
    margin: 16px;
`;
const UpgradeStudent: React.FC = () => {
    const history = useHistory();
    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            rangeInfo: 150,
            gender: 'MALE',
            email: '',
            privateToggle: false,
            privateCheck: true,
            radioGrp: 'biff',
            startDate: '2021-8'
        }
    });

    console.log(errors);
    console.log(getValues());

    /**
     *
     * @param data
     */
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <IonPage>
            <ToolBarWithGoBack backTo={() => history.goBack()} title="Upgrade To Student" />
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <BoxInput>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* === ION DATE TIME === */}
                        <IonItem>
                            <IonLabel>PICK DATE</IonLabel>
                            {/* <IonDatetime {...register('startDate', { required: 'must pick date' })} /> */}
                        </IonItem>

                        {/* === ION SELECT === */}
                        <IonItem>
                            <IonLabel>Gender</IonLabel>
                            <Controller
                                render={({ field }) => (
                                    <IonSelect
                                        placeholder="Select One"
                                        value={field.value}
                                        onIonChange={e => setValue('gender', e.detail.value)}
                                    >
                                        <IonSelectOption value="FEMALE">Female</IonSelectOption>
                                        <IonSelectOption value="MALE">Male</IonSelectOption>
                                    </IonSelect>
                                )}
                                control={control}
                                name="gender"
                                rules={{ required: 'This is a required field' }}
                            />
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="gender"
                            as={<div style={{ color: 'red' }} />}
                        />

                        {/* === ION INPUT === */}
                        <IonItem>
                            <IonLabel>Email</IonLabel>
                            <IonInput
                                {...register('email', {
                                    required: 'Email is a required field',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'invalid email address'
                                    }
                                })}
                            />
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            as={<div style={{ color: 'red' }} />}
                        />

                        {/* === ION RADIO === */}
                        <IonItem>
                            <IonText>
                                <div style={{ padding: 8, paddingLeft: 0, fontWeight: 'bold' }}>
                                    Radio Group
                                </div>
                                <div>
                                    <IonRadioGroup
                                        style={{ display: 'flex', width: '100%' }}
                                        {...register('radioGrp', { required: true })}
                                        defaultValue={getValues('radioGrp')}
                                        onIonChange={e => setValue('radioGrp', e.detail.value)}
                                    >
                                        <IonItem
                                            lines="none"
                                            style={{
                                                flexGrow: 2
                                            }}
                                        >
                                            <IonLabel position="fixed">Biff</IonLabel>
                                            <IonRadio slot="end" value="biff" />
                                        </IonItem>

                                        <IonItem style={{ flexGrow: 2 }} lines="none">
                                            <IonLabel position="fixed">Griff</IonLabel>
                                            <IonRadio slot="end" value="griff" />
                                        </IonItem>
                                        <IonItem style={{ flexGrow: 2 }} lines="none">
                                            <IonLabel position="fixed">Buford</IonLabel>
                                            <IonRadio slot="end" value="buford" />
                                        </IonItem>
                                    </IonRadioGroup>
                                </div>
                            </IonText>
                        </IonItem>
                        {errors.radioGrp && (
                            <span className="error-msg">This field is required</span>
                        )}

                        {/* === ION CHECKBOX === */}
                        <IonItem>
                            <IonLabel>Private Check</IonLabel>
                            <Controller
                                name="privateCheck"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <IonCheckbox
                                            checked={field.value}
                                            onIonChange={e => {
                                                setValue('privateCheck', e.detail.checked);
                                            }}
                                        />
                                    );
                                }}
                            />
                        </IonItem>

                        {/* === ION TOGGLE === */}
                        <IonItem>
                            <IonLabel>Private Toggle</IonLabel>
                            <Controller
                                name="privateToggle"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <IonToggle
                                            checked={field.value}
                                            onIonChange={e => {
                                                setValue('privateToggle', e.detail.checked);
                                            }}
                                        />
                                    );
                                }}
                            />
                        </IonItem>

                        {/* === ION RANGE === */}
                        <IonItem>
                            <Controller
                                render={({ field }) => (
                                    <IonRange
                                        min={-200}
                                        max={200}
                                        value={field.value}
                                        color="secondary"
                                        onIonChange={e => {
                                            setValue('rangeInfo', e.detail.value as number);
                                        }}
                                    >
                                        <IonLabel slot="start">-200</IonLabel>
                                        <IonLabel slot="end">200</IonLabel>
                                    </IonRange>
                                )}
                                control={control}
                                name="rangeInfo"
                                rules={{ required: 'Please Select A Value' }}
                            />
                        </IonItem>
                        <ErrorMessage
                            errors={errors}
                            name="rangeInfo"
                            as={<div style={{ color: 'red' }} />}
                        />
                        <div>
                            <IonButton type="submit">submit</IonButton>
                        </div>
                    </form>
                </BoxInput>
            </IonContent>
        </IonPage>
    )
}

export default UpgradeStudent;
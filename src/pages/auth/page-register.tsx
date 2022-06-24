import { chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons';
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './auth.css';
import Axios from 'axios';
import { useState } from 'react';
import MyAlert from '../../components/Alert';




const Register: React.FC = () => {
    interface IAlert {
        type: string
        show: boolean
        header: string
        msg: string
    }
    const url = "http://localhost:3000/api/auth/register";
    const [email, setEmail] = useState("");
    const [Alert, setAlert] = useState<IAlert>(
        {
            type: "success",
            show: false,
            header: "",
            msg: ""
        }
    );

    const onSubmit = (e: any) => {
        e.preventDefault();
        Axios.post(url, { "email": email, "link": "http://localhost:8100/register/verify-account" }).then((res) => {
            if (res.status == 200) {
                setAlert({
                    type: "success",
                    show: true,
                    header: "Berhasil",
                    msg: res.data.msg
                });
                
            } else {
                setAlert({
                    type: "failed",
                    show: true,
                    header: "Gagal",
                    msg: res.data.sg
                });
            }
        }, failed => {
            alert(failed)
            setAlert({
                type: "failed",
                show: true,
                header: "Gagal",
                msg: failed
            });
        })
    }

    const onTyping = (e: any) => {
        console.log(e.detail.value);
        setEmail(e.detail.value);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Registration Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <MyAlert
                        showAlert={Alert?.show}
                        type={Alert?.type}
                        header={Alert.header}
                        message={Alert.msg}
                    />
                    <form onSubmit={e => onSubmit(e)}>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="flex-center">
                                    <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="logo-size-1 animate__animated animate__bounce" />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonLabel position="floating">Email Address</IonLabel>
                                        <IonInput
                                            type="email"
                                            value={email}
                                            name="email"
                                            onIonChange={e => onTyping(e!)}
                                        ></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="flex-center mt-2">
                                <IonButton href="/login" color="light">
                                    <IonIcon icon={chevronBackCircleOutline} slot="start"></IonIcon>
                                    <IonLabel>Back</IonLabel>
                                </IonButton>
                                <IonButton type='submit' color="light">
                                    <IonIcon icon={chevronForwardCircleOutline} slot="end"></IonIcon>
                                    <IonLabel>Next</IonLabel>
                                </IonButton>
                            </IonRow>
                        </IonGrid>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Register;
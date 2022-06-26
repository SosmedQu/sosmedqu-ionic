import { chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons';
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './auth.css';
import Axios from 'axios';
import { useState } from 'react';
import MyAlert from '../../components/Alert';
import MyApi from '../../helpers/my-api';




const Register: React.FC = () => {
    interface IAlert {
        type: string
        show: boolean
        msg: string
    }
    const url = "http://localhost:3000/api/auth/register";
    const [email, setEmail] = useState("");
    const [Alert, setAlert] = useState<IAlert>(
        {
            type: "",
            show: false,
            msg: ""
        }
    );

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(e);
        const api = new MyApi();
        api.register({ email: email, link: "http://localhost:8100/register/create-password" }).then((response) => {
            setAlert({
                type: "Berhasil",
                show: true,
                msg: response.data
            })
        }, (err) => {
            setAlert({
                type: "Gagal",
                show: true,
                msg: err
            })
        });
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
                        message={Alert.msg}
                    />
                    <form onSubmit={e => onSubmit(e)}>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="flex-center">
                                    <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="logo-size-1" />
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
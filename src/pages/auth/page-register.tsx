import { chevronBackCircleOutline, chevronForwardCircleOutline } from "ionicons/icons";
import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import "./auth.css";
import Axios from "axios";
import { useState } from "react";
import MyApi from "../../helpers/my-api_helper";
import { useHistory, useLocation } from "react-router";
import Env from "../../helpers/env_helper";

const Register: React.FC = () => {
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(false);
    interface IAlert {
        type: string;
        show: boolean;
        header: string;
        msg: string;
        buttons: any;
    }
    const location = useLocation();
    const [email, setEmail] = useState(location.state ? location.state as string : "");
    const [Alert, setAlert] = useState<IAlert>({
        type: "",
        show: false,
        msg: "",
        header: "",
        buttons: undefined,
    });
    const resetAlert = () => {
        setAlert({
            type: "",
            show: false,
            msg: "",
            header: "",
            buttons: undefined,
        });
    };

    const onSubmit = (e: any) => {
        setShowLoading(true)
        e.preventDefault();
        const api = new MyApi();
        api.register({ email: email, link: `http://${Env.URLWEB}/register/create-password` }).then(
            (response) => {
                setAlert({
                    type: "success",
                    show: true,
                    header: "Berhasil",
                    msg: response.data.msg,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.push({
                                    pathname: "/register/verify-email",
                                    state: email,
                                });
                            },
                        },
                    ],
                });
            },
            (err) => {
                setAlert({
                    type: "failed",
                    header: "Gagal",
                    show: true,
                    msg: err.response.data.errors[0].msg,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                console.log("Test Success");
                            },
                        },
                    ],
                });
            }
        ).finally(() => {
            setShowLoading(false);
        });
    };

    const onTyping = (e: any) => {
        setEmail(e.detail.value);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Registration Account</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <IonAlert isOpen={Alert.show} header={Alert.header} cssClass={"text-center alert-" + Alert.type} message={Alert.msg} buttons={Alert.buttons} onDidDismiss={() => resetAlert()} />
                    <form onSubmit={(e) => onSubmit(e)}>
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
                                        <IonInput type="email" value={email} name="email" onIonChange={(e) => onTyping(e!)}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="flex-center mt-2">
                                <IonButton href="/login" color="light">
                                    <IonIcon icon={chevronBackCircleOutline} slot="start"></IonIcon>
                                    <IonLabel>Back</IonLabel>
                                </IonButton>
                                <IonButton type="submit" color="light">
                                    <IonIcon icon={chevronForwardCircleOutline} slot="end"></IonIcon>
                                    <IonLabel>Next</IonLabel>
                                </IonButton>
                            </IonRow>
                        </IonGrid>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Register;

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonAlert } from "@ionic/react";
import { mailOutline, sendSharp, mailSharp } from "ionicons/icons";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import MyApi from "../../helpers/my-api_helper";

const VerifikasiEmail: React.FC = () => {
    const history = useHistory();
    interface IAlert {
        type: string;
        show: boolean;
        header: string;
        msg: string;
        buttons: any;
    }
    const [Alert, setAlert] = useState<IAlert>({
        type: "",
        show: false,
        msg: "",
        header: "",
        buttons: undefined,
    });

    const location = useLocation();
    const email = location.state ? location.state : null;
    const resendEmail = () => {

        const api = new MyApi();
        api.register({ email: email, link: "http://localhost:8100/register/create-password" }).then(
            (response) => {
                setAlert({
                    type: "success",
                    show: true,
                    header: "Berhasil",
                    msg: response.data.msg,
                    buttons: [
                        {
                            text: "OK",
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
                        },
                    ],
                });
            }
        );
    };
    const resetAlert = () => {
        setAlert({
            type: "",
            show: false,
            msg: "",
            header: "",
            buttons: undefined,
        });
    };

    const changeEmail = () => {
        history.push(
            '/register', email
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Verifikasi Email</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Verifikasi Email</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <IonAlert isOpen={Alert.show} header={Alert.header} cssClass={"text-center alert-" + Alert.type} message={Alert.msg} buttons={Alert.buttons} onDidDismiss={() => resetAlert()} />
                    <IonIcon icon={mailOutline} style={{ fontSize: "150px" }}></IonIcon>
                    <h1>Verify Your Email</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla
                        est
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit ame venenatis, <a>Click Resend Verify</a>
                    </p>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonButton color="light" onClick={() => resendEmail()}>
                                    <IonIcon icon={sendSharp} slot="start"></IonIcon>
                                    <IonLabel>Resend Verify</IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="light" onClick={() => changeEmail()}>
                                    <IonIcon icon={mailSharp} slot="start"></IonIcon>
                                    <IonLabel>Change Email</IonLabel>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default VerifikasiEmail;

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonAlert, IonImg } from "@ionic/react";
import { mailOutline, sendSharp, mailSharp, arrowBackSharp } from "ionicons/icons";
import { relative } from "path";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { BoxContent, Header, BoxForm, Content } from "../../components/auth";
import { IconMD } from "../../components/Utils/style/icon";
import { Loading } from "../../components/Utils/style/loading";
import MyApi from "../../helpers/my-api_helper";

const VerifikasiEmail: React.FC = () => {
    document.getElementById("tab-bar-bottom")?.classList.add("d-none");
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
    const email: any = location.state ? location.state : null;
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

    const changeEmail = () => {
        history.push(
            '/register', email
        )
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <BoxContent>
                    <Header>
                    </Header>
                    <Content className="mt-5 text-dark">
                        <IonImg className="ilustrasi my-4" src={process.env.PUBLIC_URL + `assets/ilustrasi/clumsy.svg`}></IonImg>
                        <h3 className="text-dark">Verify Your Email</h3>
                        <p>
                            Selamat pendaftaran anda berhasil silahkan verifikasi di email <b>{email}</b> anda dengan click activate pada gmail
                        </p>
                        <p>
                            tidak mendapatkan verifikasi? <a>Click Resend Verify</a>
                        </p>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12">
                                    <IonButton color="primary" onClick={() => resendEmail()}>
                                        <IonIcon icon={sendSharp} slot="start"></IonIcon>
                                        <IonLabel>Resend Verify</IonLabel>
                                    </IonButton>
                                </IonCol>
                                <IonCol size="12">
                                    <IonButton color="primary" onClick={() => changeEmail()}>
                                        <IonIcon icon={mailSharp} slot="start"></IonIcon>
                                        <IonLabel>Change Email</IonLabel>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </Content>
                </BoxContent>
            </IonContent>
        </IonPage>
    );
};

export default VerifikasiEmail;

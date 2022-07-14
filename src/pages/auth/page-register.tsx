import { arrowBackSharp, mailSharp, personAddSharp } from "ionicons/icons";
import { IonButton, IonCol, IonContent, IonImg, IonInput, IonLabel, IonLoading, IonPage, IonRow, useIonAlert } from "@ionic/react";
import "./auth.css";
import { useState } from "react";
import MyApi from "../../helpers/my-api_helper";
import { useHistory, useLocation } from "react-router";
import Env from "../../helpers/env_helper";
import { BoxContent, Header, IconDaftar, IconHeader, BoxForm, MyForm, Iteminput, IconInput, Footer } from "../../components/auth";
import { IconMD } from "../../components/Utils/style/icon";
import { Loading } from "../../components/Utils/style/loading";
import { navigate } from '../../helpers/navigation_helper';

const Register: React.FC = () => {
    document.getElementById("tab-bar-bottom")?.classList.add("d-none");
    const history = useHistory();
    const [presentAlert] = useIonAlert();
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

    const onSubmit = (e: any) => {
        setShowLoading(true)
        e.preventDefault();
        const api = new MyApi();
        api.register({ email: email, link: `http://${Env.URLWEB}/register/create-password` }).then(
            (response) => {
                presentAlert({
                    header: "Berhasil",
                    message: response.data.msg,
                    cssClass: "custom-alert text-center alert-success",
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.push("/register/verify-email", email)
                            }
                        }
                    ]
                })
            },
            (err) => {
                console.log(err);
                presentAlert({
                    header: "Gagal",
                    message: err.response.data.msg ?? err.response.data.errors[0].msg,
                    cssClass: "custom-alert text-center alert-failed",
                    buttons: [
                        {
                            text: "OK",
                        }
                    ]
                })
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
            <IonContent fullscreen>
                <BoxContent>
                    {/* <BgBlue /> */}
                    <Header>
                        <IconMD style={{ color: "#fff" }} icon={arrowBackSharp} onClick={() => history.goBack()}></IconMD>
                    </Header>
                    <Loading
                        cssClass='loading-post'
                        isOpen={showLoading}
                        spinner={'lines'}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                    />
                    <h1>Daftar Akun</h1>
                    <MyForm onSubmit={(e) => onSubmit(e)}>
                        <IonRow>
                            <IonCol className="flex-center">
                                <IonImg src={process.env.PUBLIC_URL + "/assets/logo/logoSomedQu.svg"} className="logo-size-1" />
                            </IonCol>
                        </IonRow>
                        <Iteminput>
                            <IconInput icon={mailSharp}></IconInput>
                            <IonInput className='input' type="email" placeholder='Email' name="email" onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                        </Iteminput>
                        <IonRow className='flex-column px-5'>
                            <IonButton type="submit" color="primary" style={{ marginBottom: "16px" }}>
                                <IonLabel>Daftar</IonLabel>
                            </IonButton>
                        </IonRow>
                        <IonRow className='justify-content-center' onClick={() => history.goBack()}>
                            <h6>Sudah Punya Akun?</h6>
                        </IonRow>
                    </MyForm>
                    <Footer>
                        <div className="hakcipta">
                            <p>Hak Cipta 2022 <br /> @sosmedQu Tentang Social Media Platform</p>
                        </div>
                    </Footer>
                </BoxContent>
            </IonContent>
        </IonPage >
    );
};

export default Register;

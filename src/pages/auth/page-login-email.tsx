import { IonButton, IonCol, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRow } from '@ionic/react';
import { arrowBackSharp, lockClosed, logoWhatsapp, mailSharp, personAddSharp } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertOk } from '../../components/Alert';
import { BoxContent, Header, IconDaftar, IconHeader, BoxForm, MyForm, Iteminput, IconInput, Footer } from '../../components/auth';
import { IconMD } from '../../components/Utils/style/icon';
import { Loading } from '../../components/Utils/style/loading';
import MyApi from '../../helpers/my-api_helper';
import { navigate } from '../../helpers/navigation_helper';
import IAlert from '../../interface/IAlert';
import './auth.css';

const LoginWithEmail: React.FC = () => {
    document.getElementById("tab-bar-bottom")?.classList.add("d-none");
    const history = useHistory();
    const [Alert, setAlert] = useState<IAlert>({ showAlert: false })
    const [showLoading, setShowLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e: any) => {
        e.preventDefault();
        const api = new MyApi();
        api.login({ email: email, password: password }).then(
            (response) => {
                console.log(response);
                setAlert({
                    type: "success",
                    showAlert: true,
                    header: "Berhasil",
                    message: response.data.msg,
                    okClick: () => {
                        navigate("profile")
                    },
                    onDidDismiss() {
                        setAlert({ showAlert: false })
                    },
                });
            },
            (err) => {
                console.log(err.response)
                setAlert({
                    type: "failed",
                    showAlert: true,
                    header: "Gagal",
                    message: err.response.data.msg,
                    okClick: () => {

                    },
                    onDidDismiss() {
                        setAlert({ showAlert: false })
                    },
                });
            }
        );
    }

    const waMe = () => {
        window.location.href = "https://wa.me/6289637502655"
    }
    return (
        <IonPage>
            <IonContent fullscreen>
                <BoxContent>
                    <Header>
                        <IconMD style={{ color: "#fff" }} icon={arrowBackSharp} onClick={() => navigate("post")}></IconMD>
                        <IconDaftar onClick={() => history.push("/register")}>
                            <IconHeader icon={personAddSharp}></IconHeader>
                            <IonLabel className='label'>Daftar</IonLabel>
                        </IconDaftar>
                    </Header>
                    <Loading
                        cssClass='loading-post'
                        isOpen={showLoading}
                        spinner={'lines'}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                    />
                    <AlertOk data={Alert} />
                    <h1>Login</h1>
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
                        <Iteminput>
                            <IconInput icon={lockClosed}></IconInput>
                            <IonInput className='input' type='password' placeholder='Password' name="password" onIonChange={(e) => setPassword(e.detail.value!)} ></IonInput>
                        </Iteminput>
                        <IonRow className='flex-column px-5'>
                            <IonButton type="submit" color="primary" style={{ marginBottom: "16px" }}>
                                <IonLabel>Login</IonLabel>
                            </IonButton>
                        </IonRow>
                        <IonRow className='justify-content-center'>
                            <h6>Lupa Password?</h6>
                        </IonRow>
                    </MyForm>
                    <Footer>
                        <div className="hakcipta">
                            <p>Hak Cipta 2022 <br /> @sosmedQu Tentang Social Media Platform</p>
                        </div>
                        <div className="icon-wa" onClick={waMe}>
                            <IonIcon icon={logoWhatsapp}></IonIcon>
                            <p>Hubungi kami</p>
                        </div>
                    </Footer>
                </BoxContent>
            </IonContent>
        </IonPage >
    )
}

export default LoginWithEmail;
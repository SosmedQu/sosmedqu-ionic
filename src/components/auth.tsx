import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackCircleOutline, chevronForwardCircleOutline, keySharp, logInSharp, logoAppleAr, logoGoogle, mailOutline, mailSharp, saveSharp, sendSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './auth.css';
import './ExploreContainer.css';

const Login: React.FC = () => {
    return (
        <IonContent fullscreen>
            <video loop muted autoPlay id="my-video">
                <source src={process.env.PUBLIC_URL + "/assets/video/video.mp4"} type="video/mp4" />
            </video>
            <div className="login-box">
                <IonButton expand="block" color="light" id='button' href="/profile">
                    <IonIcon slot="start" icon={logoGoogle} />
                    <IonLabel>Login With Google</IonLabel>
                </IonButton>
                <IonButton expand="block" color="light" id='button' href="/loginEmail">
                    <IonIcon slot="start" icon={mailSharp} />
                    <IonLabel>Login With Email</IonLabel>
                </IonButton>
                <p>Don't have any account? <Link to="/register"><b>Register</b></Link></p>
            </div>
        </IonContent>
    )
}

const LoginEmail: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login With Email</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login With Email</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="container">
                    <IonIcon icon={logoAppleAr} style={{ "font-size": "150px" }}></IonIcon>
                    <form action="">
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput type="email" name="email"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput type='password' name="password"></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <IonButton type="submit" color="light" style={{ "margin-bottom": "16px" }}>
                                <IonIcon icon={logInSharp} slot="start"></IonIcon>
                                <IonLabel>Login</IonLabel>
                            </IonButton>
                            <p>Don't have any account? <Link to="/register"><b>Register</b></Link></p>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

const Register: React.FC = () => {
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
                    <IonIcon icon={logoAppleAr} style={{ "font-size": "150px" }}></IonIcon>
                    <form action="/register/verifikasi">
                        <IonItem>
                            <IonLabel position="floating">Email Address</IonLabel>
                            <IonInput type="email" name="email"></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <div>
                                <IonButton type="submit" color="light">
                                    <IonIcon icon={chevronForwardCircleOutline} slot="start"></IonIcon>
                                    <IonLabel>Next</IonLabel>
                                </IonButton>
                            </div>
                            <div>
                                <IonButton href="/login" color="light">
                                    <IonIcon icon={chevronBackCircleOutline} slot="start"></IonIcon>
                                    <IonLabel>Back</IonLabel>
                                </IonButton>
                            </div>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

const VerifikasiEmail: React.FC = () => {

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
                    <IonIcon icon={mailOutline} style={{ "font-size": "150px" }}></IonIcon>
                    <h1>Verify Your Email</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit ame venenatis, <a>Click Resend Verify</a></p>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonButton color="light">
                                    <IonIcon icon={sendSharp} slot="start"></IonIcon>
                                    <IonLabel>Resend Verify</IonLabel>
                                </IonButton>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton color="light" href="/register">
                                    <IonIcon icon={mailSharp} slot="start"></IonIcon>
                                    <IonLabel>Change Email</IonLabel>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}

const CreatePassword: React.FC = () => {
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
                    <IonIcon icon={keySharp} style={{ "font-size": "150px" }}></IonIcon>
                    <form action="/profile">
                        <IonItem>
                            <IonLabel position="floating">Your Name</IonLabel>
                            <IonInput type="text" name="name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">New Password</IonLabel>
                            <IonInput type="password" name="password"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Confirm Password</IonLabel>
                            <IonInput type="password" name="confirm-password"></IonInput>
                        </IonItem>
                        <div className="btn-submit">
                            <IonButton type="submit" color="light">
                                <IonIcon icon={saveSharp} slot="start"></IonIcon>
                                <IonLabel>Save</IonLabel>
                            </IonButton>
                        </div>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export { Login, LoginEmail, Register, VerifikasiEmail, CreatePassword };
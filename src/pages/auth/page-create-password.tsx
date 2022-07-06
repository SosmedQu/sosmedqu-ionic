import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonButton, IonAlert, useIonViewDidEnter, IonLoading } from "@ionic/react"
import { keySharp, saveSharp } from "ionicons/icons"
import { useState } from "react";
import { MyApi } from "../../helpers/my-api_helper";
import { useHistory } from "react-router";

const CreatePassword: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    const [showLoading, setShowLoading] = useState(true);
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
    const urlParams = new URLSearchParams(window.location.search);
    const api = new MyApi();
    useIonViewDidEnter(() => {
        api.verifyEmail({ token: urlParams.get("token"), email: urlParams.get("email") }).then(
            (response) => {
                console.log(response);
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
                            handler: () => {
                                history.push({
                                    pathname: "/register",
                                });
                            },
                        },
                    ],
                });
            }).catch(err => {
                setAlert({
                    type: "failed",
                    header: "Gagal",
                    show: true,
                    msg: err,
                    buttons: [
                        {
                            text: "OK",
                            handler: () => {
                                history.push({
                                    pathname: "/register",
                                });
                            },
                        },
                    ],
                });
            }).finally(() => {
                setShowLoading(false);
            })
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
        e.preventDefault();
        const data = new FormData(e.target);
        data.append("email", urlParams.get("email")?.toString()!)
        console.log(data);
        console.log(Object.fromEntries(data));
        api.createPassword(Object.fromEntries(data)).then((response) => {
            console.log(response);
            setAlert({
                type: "success",
                show: true,
                header: "Berhasil",
                msg: response.data.msg,
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            api.login(Object.fromEntries(data)).then((response) => {
                                console.log(response);
                                history.push("/profile");
                            }, err => {
                                console.log(err);
                            })
                        },
                    },
                ],
            });
        }, (err) => {
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
        }).catch(err => {
            setAlert({
                type: "failed",
                header: "Gagal",
                show: true,
                msg: err,
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            history.push({
                                pathname: "/register",
                            });
                        },
                    },
                ],
            });
        })
    }
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
                    <IonIcon icon={keySharp} style={{ "font-size": "150px" }}></IonIcon>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <IonItem>
                            <IonLabel position="floating">Your Name</IonLabel>
                            <IonInput type="text" value={name} name="username" onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">New Password</IonLabel>
                            <IonInput type="password" value={password} name="password" onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Confirm Password</IonLabel>
                            <IonInput type="password" value={confirmPassword} name="confirmPassword" onIonChange={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
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

export default CreatePassword;
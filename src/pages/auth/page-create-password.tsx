import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react"
import { keySharp, saveSharp } from "ionicons/icons"
import Axios from 'axios';
import { useState } from "react";
import MyAlert from "../../components/Alert";
import { error } from "console";
import { MyApi } from "../../helpers/my-api";
import { useHistory } from "react-router";

const CreatePassword: React.FC = () => {
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
    const urlParams = new URLSearchParams(window.location.search);
    const api = new MyApi();
    api.verifyEmail({ "token": urlParams.get("token")?.toString(), "email": urlParams.get("email")?.toString() }).then(
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
                        handler: () => {
                            history.push({
                                pathname: "/register",
                            });
                        },
                    },
                ],
            });
        }
    )
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

export default CreatePassword;
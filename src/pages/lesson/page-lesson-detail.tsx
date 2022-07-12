import { IonAvatar, IonButton, IonFab, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, useIonAlert, useIonViewWillEnter } from "@ionic/react";
import { calendarClearSharp, calendarNumber, pencil, trash } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import Avatar from "../../components/Utils/style/avatar";
import Content from "../../components/Utils/style/content";
import { Header } from "../../components/Utils/style/header";
import Item from "../../components/Utils/style/item";
import AssetsApi from "../../helpers/assets-api_helper";
import MyApi from "../../helpers/my-api_helper";
import { navigate } from "../../helpers/navigation_helper";

const BoxItem = styled(Item)`
    margin: 16px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    ::before{
        content: "";
        border-radius: 8px 0 0 8px;
        height: 100%;
        width: 8px;
        background-color: var(--ion-color-primary);
        position: absolute;
        left: 0;
        z-index: 2;
    }
    // :hover {
    //     transform: scale(1.02);
    // }
`;

const P = styled.p`
    margin: 0;
`;

interface ISubject {
    id: number
    subject: string
    Day: {
        day: string
    }
    dayId: number
    image: string
    hour: string
    class: string
    teacher: string
    semester: number
}

export const PageLessonDetail: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const [presentAlert] = useIonAlert();
    const state: any = location.state
    const api = new MyApi();
    const [subject, setSubject] = useState<ISubject[]>([]);
    useIonViewWillEnter(() => {
        api.getSubjectByDayId(state.dayId).then((res) => {
            setSubject(res.data.subjects)
        })
    })
    const handlerHapus = (id: number) => {
        presentAlert({
            header: 'Hapus jadwal?',
            message: "Yakin ingin Menghapus jadwal ini?",
            cssClass: "alert-logout",
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        api.deleteSubject(id).then((res) => {
                            alert(res.data.msg)
                            window.location.reload();
                        })
                    }
                },
            ],
        })
    }

    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.goBack()} title="JadwalQu">

                </ToolBarWithGoBack>
            </Header>
            <Content>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton className="btn-circle" onClick={() => history.push("/lesson/cu")}>
                        <IonIcon icon={calendarClearSharp} />
                    </IonButton>
                </IonFab >
                <div className="box-lesson">
                    {subject.map((val, i) => (
                        <BoxItem key={i}>
                            <Avatar slot="start">
                                <IonImg src={`${AssetsApi.URLImgSubject}/${val.image}`}></IonImg>
                            </Avatar>
                            <div className="detail">
                                <h5>{val.subject}</h5>
                                <P>{val.Day.day} {val.hour}</P>
                                <P>{val.class} semester {val.semester}</P>
                                <P>{val.teacher}</P>
                            </div>
                            <div slot="end" className="d-flex flex-column">
                                <IonButton color={"primary"} onClick={() => history.push("/lesson/cu", val)}>
                                    <IonIcon icon={pencil}></IonIcon>
                                </IonButton>
                                <IonButton color={"danger"} onClick={() => handlerHapus(val.id)}>
                                    <IonIcon icon={trash}></IonIcon>
                                </IonButton>
                            </div>
                        </BoxItem>
                    ))}
                </div>
            </Content>
        </IonPage>
    )
}
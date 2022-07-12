import { IonAvatar, IonButton, IonFab, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, useIonViewWillEnter } from "@ionic/react";
import { calendarClearSharp, calendarNumber } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import Content from "../../components/Utils/style/content";
import { Header } from "../../components/Utils/style/header";
import Item from "../../components/Utils/style/item";
import MyApi from "../../helpers/my-api_helper";

const BoxItem = styled(Item)`
    margin: 16px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    text-align:center;
    ::before{
        content: "";
        border-radius: 8px 0 0 8px;
        height: 100%;
        width: 8px;
        background-color: var(--ion-color-secondary);
        position: absolute;
        left: 0;
        z-index: 2;
    }
    // :hover {
    //     transform: scale(1.02);
    // }
`;

interface ISubjectDay {
    dayId: number
    day: string
}

export const PageLesson: React.FC = () => {
    const history = useHistory();
    const api = new MyApi();
    const [subjectDay, setSubjectDay] = useState<ISubjectDay[]>([]);
    useIonViewWillEnter(() => {
        api.getSubject().then((res) => {
            setSubjectDay(res.data.subjects)
        })
    })

    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.goBack()} title="Jadwal Hari">

                </ToolBarWithGoBack>
            </Header>
            <Content>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton className="btn-circle" onClick={() => history.push("/lesson/cu")}>
                        <IonIcon icon={calendarClearSharp} />
                    </IonButton>
                </IonFab >
                <div className="box-lesson">
                    {subjectDay.map((val, i) => (
                        <BoxItem button key={i} onClick={() => history.push("/lesson/detail", val)}>
                            <IonTitle>{val.day}</IonTitle>
                        </BoxItem>
                    ))}
                </div>
            </Content>
        </IonPage>
    )
}
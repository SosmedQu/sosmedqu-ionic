import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonIcon, IonImg, IonItem, IonLabel, IonNote, IonPage, IonText, IonTitle, useIonViewWillEnter } from "@ionic/react";
import { addSharp, calendarClearSharp, calendarNumber, trash } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import Content from "../../components/Utils/style/content";
import { Header } from "../../components/Utils/style/header";
import Item from "../../components/Utils/style/item";
import MyApi from "../../helpers/my-api_helper";
import { navigate } from "../../helpers/navigation_helper";

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

interface INotes {
    id: number
    LabelNote: {
        labelName: string
        color: string
    }
    title: string
    description: string
}

export const PageNotes: React.FC = () => {
    const history = useHistory();
    const api = new MyApi();
    const [notes, setNotes] = useState<INotes[]>([]);
    useIonViewWillEnter(() => {
        api.getAllNotes().then((res) => {
            console.log(res.data);
            setNotes(res.data.notes);
        })
    })

    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => navigate("post")} title="NoteQu">

                </ToolBarWithGoBack>
            </Header>
            <Content>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton className="btn-circle" onClick={() => history.push("/notequ/create")}>
                        <IonIcon icon={addSharp} />
                    </IonButton>
                </IonFab >
                <div className="box-lesson">
                    {notes.map((val, i) => (
                        <IonItem key={i} onClick={() => history.push("/notequ/detail", val)} lines="full" className="my-3">
                            <div slot="start" style={{
                                height: "100px",
                                width: "8px",
                                background: val.LabelNote.color,
                                display: "block"
                            }} ></div>
                            <div>
                                <IonLabel>{val.title.length > 16 ? val.title.substring(0, 16) + '...' : val.title}</IonLabel>
                                <IonNote className="m-0">{val.LabelNote.labelName.length > 12 ? val.LabelNote.labelName.substring(0, 12) + '...' : val.LabelNote.labelName}</IonNote>
                                <p>{val.description.length > 48 ? val.description.substring(0, 48) + '...' : val.description}</p>
                            </div>
                        </IonItem>
                    ))}
                </div>
            </Content>
        </IonPage>
    )
}
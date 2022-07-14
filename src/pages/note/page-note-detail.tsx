import { IonPage, IonFab, IonButton, IonIcon, IonCard, IonCardHeader, IonLabel, IonCardTitle, IonCardContent, IonContent, IonNote, IonHeader } from "@ionic/react";
import { addSharp, pencil, trash } from "ionicons/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { Header } from "../../components/auth";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import MyApi from "../../helpers/my-api_helper";

const Content = styled(IonContent)`

    .box-note
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content:  space-between;
`;

export const PageNoteDetail: React.FC = () => {
    const api = new MyApi();
    const history = useHistory();
    const location = useLocation();
    const note: any = location.state
    return (
        <IonPage>
            <IonHeader>
                <ToolBarWithGoBack backTo={() => history.goBack()} title={note ? (note.title.lenght > 12 ? note.title.substring(0, 12) + `...` : note.title) : ''}>
                </ToolBarWithGoBack>
            </IonHeader>
            <Content>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonButton className="btn-circle" onClick={() => history.push("/notequ/create")}>
                        <IonIcon icon={addSharp} />
                    </IonButton>
                </IonFab >
                <IonCard>
                    <IonCardHeader>
                        <ContentHeader>
                            <div>
                                <IonCardTitle>{note && note.title}</IonCardTitle>
                            </div>
                            <div>
                                <IonNote>{note && note.LabelNote.labelName}</IonNote>
                                <br />
                                <IonButton color={'primary'} slot="end" onClick={() => history.push("/notequ/update", note)}>
                                    <IonIcon icon={pencil}></IonIcon>
                                </IonButton>
                                <IonButton color={'danger'} slot="end" onClick={() => api.deleteNote(note && note.id)}>
                                    <IonIcon icon={trash}></IonIcon>
                                </IonButton>
                            </div>
                        </ContentHeader>
                    </IonCardHeader>
                    <IonCardContent>
                        {note && note.description}
                    </IonCardContent>
                </IonCard>
            </Content>
        </IonPage>
    )
}
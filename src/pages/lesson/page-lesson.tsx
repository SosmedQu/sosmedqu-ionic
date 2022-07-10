import { IonAvatar, IonImg, IonItem, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import Content from "../../components/Utils/style/content";
import { Header } from "../../components/Utils/style/header";
import Item from "../../components/Utils/style/item";

const BoxItem = styled(Item)`
    margin: 16px 0;
    --background: #ffd9de;
    --border-radius: 8px;
    ::before{
        content: "";
        border-radius: 8px 0 0 8px;
        height: 100%;
        width: 8px;
        background-color: #fe7587;
        position: absolute;
        z-index: 2;
    }
`;


export const PageLesson: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <Header>
                <ToolBarWithGoBack backTo={() => history.goBack()}>

                </ToolBarWithGoBack>
            </Header>
            <Content>
                <div className="box-lesson">
                    <BoxItem>
                        <IonAvatar slot="start">
                            <IonImg src={process.env.PUBLIC_URL + "/assets/img/default-ebook.svg"} />
                        </IonAvatar>
                        <IonLabel>Tekhnologi</IonLabel>
                    </BoxItem>
                </div>
            </Content>
        </IonPage>
    )
}
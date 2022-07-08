import { IonToolbar, IonIcon, IonTitle, IonMenuToggle } from "@ionic/react";
import { addCircleSharp, addOutline, addSharp, arrowBackSharp, menuSharp, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FibPost } from "../../fab";
import { IconMD, IconSM, IconToolbar } from "../style/icon";
import { Toolbar } from "../style/toolbar";

const ToolBarWithGoBack: React.FC<{ title?: string, backTo: () => void }> = (props) => {
    const Box = styled.div`
        // border: 1px solid red;
        text-align: center;
        margin: 0 24px 0 0;
    `;
    return (
        <IonToolbar className="ion-padding p-0" color={'primary'} >
            <IonIcon slot="start" onClick={props.backTo} icon={arrowBackSharp} className="icon-navigation"></IonIcon>
            <Box>
                <IonTitle>{props.title}</IonTitle>
            </Box>
            {props.children}
        </IonToolbar>
    )
}

const ToolBarWithSideBar: React.FC = (props) => {
    return (
        <Toolbar color={'primary'} >
            <IonMenuToggle slot="start">
                <IconMD icon={menuSharp} className="icon-navigation"></IconMD>
            </IonMenuToggle>
            <IconToolbar slot="end" icon={addSharp} />
            {props.children}
        </Toolbar>
    )
}



export { ToolBarWithGoBack, ToolBarWithSideBar };
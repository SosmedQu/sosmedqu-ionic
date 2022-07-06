import { IonToolbar, IonIcon, IonTitle } from "@ionic/react";
import { arrowBackSharp } from "ionicons/icons";
import { useHistory } from "react-router";
import styled from "styled-components";

const ToolBarWithGoBack: React.FC<{ title: string, backTo: () => void }> = (props) => {
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

export default ToolBarWithGoBack;
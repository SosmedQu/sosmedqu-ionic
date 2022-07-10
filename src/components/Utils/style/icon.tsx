import { IonIcon } from "@ionic/react";
import styled from "styled-components";

const IconSM = styled(IonIcon)`
    font-size: 24px;
`;
const IconMD = styled(IonIcon)`
    font-size: 32px;
`;

const IconLG = styled(IonIcon)`
    font-size: 64px;
`;

const IconToolbar = styled(IonIcon)`
    font-size: 20px;
    padding: 4px;
    margin: 0 0 0 .8rem;
    border-radius: .3rem;
    color: var(--ion-color-primary);
    border: 1.5px solid var(--ion-color-primary);
    cursor: pointer;
    :hover{
        color: var(--ion-color-secondary);
        border-color: var(--ion-color-secondary);
    }
    :onClick{
        background-color: var(--ion-color-secondary)
    }
`;

export { IconMD, IconSM, IconLG, IconToolbar };
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
    border: 1.5px solid var(--ion-color-light);
`;

export { IconMD, IconSM, IconLG, IconToolbar };
import { IonTitle } from "@ionic/react";
import styled from "styled-components"

const ContentError = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const PageError: React.FC<{ title: string }> = (props) => {
    return (
        <ContentError>
            <div>
                {props.children}
                <IonTitle>{props.title}</IonTitle>
            </div>
        </ContentError>
    )
}
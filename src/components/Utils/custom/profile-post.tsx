import { IonImg } from "@ionic/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WhenClick = styled(Link)`

`;
const MyPostBox = styled.div`
    display: flex;
`;
const MyPostImage = styled(IonImg)`
    height: 120px;
    width: 120px;
    object-fit: cover;
    @media only screen and (min-width: 576.5px) {
        height: 100%;
        width: 100%;
    }
    @media only screen and (min-width: 768) {
        height: 100%;
        width: 100%;
    }
`;

export {WhenClick,MyPostBox, MyPostImage};
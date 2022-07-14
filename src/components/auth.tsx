import { IonPage, IonContent, IonLabel, IonIcon } from "@ionic/react";
import { arrowBackSharp, navigate, personAddSharp, logoWhatsapp } from "ionicons/icons";
import React from "react";
import styled from "styled-components";
import { AlertOk } from "./Alert";
import Alert from "./element/Alert";
import { IconSM, IconMD } from "./Utils/style/icon";
import { Loading } from "./Utils/style/loading";

export const BoxContent = styled.div`
    width: 100vw;
    display: flex;
    justify-content:start;
    align-items: center;
    flex-direction: column;
    ::before{
        content: "";
        background: var(--ion-color-primary-tint);
        position: absolute;
        border-radius: 0 0 20px 20px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 60vh;
    }
    h1 {
        position: relative;
        color: #fff;
        font-size: 40px;
        font-weight: 800;
        margin: 24px 0 32px;
    }
    .icon {
        position:relative;
        color: #fff;
        font-size: 100px;
    }
    
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
`;

export const IconHeader = styled(IconSM)`
    color: #fff;
`;

export const BoxForm = styled.div`
    position: absolute;
    z-index: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:start;
    align-items: center;
`;

export const MyForm = styled.form`
    position: relative;
    width: 90%;
    border-radius: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    background: var(--ion-color-light);
    padding: 8px;
`;

export const IconDaftar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
        color: #fff;
        font-size: 12px;
    }
`;

export const Iteminput = styled.div`
    --background: var(--ion-color-light-tint);
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border: 1px solid var(--ion-color-dark);
    border-radius: 16px;
    margin: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    padding: 8px;
    .input{
    }
`;

export const IconInput = styled(IconSM)`
    color: var(--ion-color-medium);
`;

export const Footer = styled.div`
    padding: 40px 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .hakcipta{
        color: var(--ion-color--dark);
        width: 200px;
        p{
            margin: 0;
            font-weight: 500;
            font-size: 15px;
        }
    }
    .icon-wa {
        ion-icon{
            background: green;
            padding: 4px;
            border: 1px solid #fff;
            border-radius: 50%;
            font-size: 32px;
            color: #fff;
        }
        text-align: center;
    }
`;

export const Content = styled.div`
    position: relative;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 90%;
    padding: 16px;
    background: #fff;
    .ilustrasi{
        width: 200px;
    }

    h3 {
        color: var(--ion-color-dark);
        font-weight: 1000;
    }
`;
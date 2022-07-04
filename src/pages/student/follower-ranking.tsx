import { IonAvatar, IonButton, IonCard, IonContent, IonHeader, IonImg, IonItem, IonItemDivider, IonLabel, IonNote, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { person } from "ionicons/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RankingHeader } from "../../components/header";
import { IconMD } from "../../components/Utils/element/icon";
import Color from "../../components/Utils/style/color";

const BoxHeader = styled.div`
    position: relative;
    padding: 20px 0 0;

`;

const CardRank1 = styled(IonCard)`

`;


const CardFollower = styled(IonCard)`
    position: absolute;
    top: 0;
    right: 5%;
    padding: 10px 20px;
    z-index: 2;
`;

const BtnLihat = styled(Link)`
    color: ${Color.primary.red};
    font-weight: 700;
`;

const ListItem = styled(IonItem)`

`;
const FollowerRanking: React.FC = () => {
    return (
        <IonPage>
            <RankingHeader />
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <BoxHeader>
                    <CardFollower color={'danger'}>
                        <p>10.000 Followers</p>
                    </CardFollower>
                    <CardRank1>
                        <IonImg src={process.env.PUBLIC_URL + "assets/img/Card Rank 1.svg"}></IonImg>
                    </CardRank1>
                </BoxHeader>
                <IonItemDivider className="px-4">
                    <IonLabel slot="start">
                        Top List Followers
                    </IonLabel>
                    <BtnLihat to={'/'} slot="end">Lihat Semua</BtnLihat>
                </IonItemDivider>
                <ListItem>
                    <IonAvatar slot="start">
                        <IconMD icon={person}></IconMD>
                    </IonAvatar>
                    <div className="">
                        <IonLabel style={{ fontWeight: "bold" }}>Nama Pengguna</IonLabel>
                        <p>Study At</p>
                        <IonNote>9.000 Followers</IonNote>
                    </div>
                    <IonButton color={'primary'} slot="end">
                        <IonLabel>Follow</IonLabel>
                    </IonButton>
                </ListItem>
                <ListItem>
                    <IonAvatar slot="start">
                        <IconMD icon={person}></IconMD>
                    </IonAvatar>
                    <div className="">
                        <IonLabel style={{ fontWeight: "bold" }}>Nama Pengguna</IonLabel>
                        <p>Study At</p>
                        <IonNote>9.000 Followers</IonNote>
                    </div>
                    <IonButton color={'primary'} slot="end">
                        <IonLabel>Follow</IonLabel>
                    </IonButton>
                </ListItem>
                <ListItem>
                    <IonAvatar slot="start">
                        <IconMD icon={person}></IconMD>
                    </IonAvatar>
                    <div className="">
                        <IonLabel style={{ fontWeight: "bold" }}>Nama Pengguna</IonLabel>
                        <p>Study At</p>
                        <IonNote>9.000 Followers</IonNote>
                    </div>
                    <IonButton color={'primary'} slot="end">
                        <IonLabel>Follow</IonLabel>
                    </IonButton>
                </ListItem>
            </IonContent>
        </IonPage>
    )
}

export default FollowerRanking;
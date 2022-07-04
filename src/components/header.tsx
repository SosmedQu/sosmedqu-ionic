import { IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackSharp, arrowRedoSharp, pencilSharp } from 'ionicons/icons';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { TopBar } from './Menu';
import { IconSM } from './Utils/element/icon';


const DefaultHeader: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar color={'primary'}>
                <TopBar />
            </IonToolbar>
        </IonHeader>
    )
}

const Icon = styled(IonIcon)`
font-size: 32px;
`;
const ProfileHeader: React.FC = () => {
    const history = useHistory();
    return (
        <IonHeader>
            <IonToolbar color={'primary'} className="ion-padding" style={{ padding: 0 }}>
                <Icon slot='start' icon={arrowBackSharp} onClick={() => {
                    history.goBack();
                }}></Icon>
                <Icon slot='end' icon={pencilSharp} onClick={() => {
                    history.push("/edit-profile");
                }}></Icon>
            </IonToolbar>
        </IonHeader>
    )
}

const JudulHalaman = styled(IonTitle)`
    font-weight: bold;
`;
const RankingHeader: React.FC = () => {
    const history = useHistory();
    return (
        <IonHeader>
            <IonToolbar color={'primary'} className="ion-padding" style={{ padding: 0, textAlign: "center" }}>
                <IconSM slot='start' icon={arrowBackSharp} onClick={() => {
                    history.goBack();
                }}></IconSM>
                <JudulHalaman>Top Followers</JudulHalaman>
                <IconSM slot='end' icon={arrowRedoSharp} onClick={() => {
                    history.goBack();
                }}></IconSM>
            </IonToolbar>
        </IonHeader>
    )
}

export { DefaultHeader, ProfileHeader, RankingHeader };
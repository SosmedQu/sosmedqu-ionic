import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackSharp, arrowRedoSharp, pencilSharp } from 'ionicons/icons';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { IconSM } from './Utils/style/icon';

const ProfileHeader: React.FC = () => {
    const history = useHistory();
    return (
        <IonHeader>
            <IonToolbar color={'primary'} className="ion-padding" style={{ padding: 0 }}>
                <IconSM slot='start' icon={arrowBackSharp} onClick={() => {
                    history.goBack();
                }}></IconSM>
                <IconSM slot='end' icon={pencilSharp} onClick={() => {
                    history.push("/edit-profile");
                }}></IconSM>
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

export { ProfileHeader, RankingHeader };
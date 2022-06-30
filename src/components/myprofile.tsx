import { IonAvatar, IonCard, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonRow, IonTitle } from '@ionic/react';
import { } from 'ionicons/icons';
import { } from 'react-router-dom';

const MyProfile: React.FC<{ data: any }> = (props) => {
    return (
        <div className="bg-light myprofile">
            <div className="box" />
            <IonCard className="profile-header">
                <IonRow>
                    <IonCol size="4" className="foto">
                        <IonAvatar>
                            <IonImg src={process.env.PUBLIC_URL + "assets/img/avatar.png"}></IonImg>
                        </IonAvatar>
                    </IonCol>
                    <IonCol size="8" className="ion-text-start">
                        <IonTitle className="px-0">{props.data.username}</IonTitle>
                        <IonTitle className="px-0">Followers 99+</IonTitle>
                    </IonCol>
                </IonRow>
            </IonCard>
        </div>
    )
}

export default MyProfile;
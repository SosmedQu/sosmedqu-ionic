import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import { } from 'react-router-dom';

const PostDefault: React.FC = () => {
    return (
        <div className="container">
            <IonGrid>
                <IonRow>
                    <IonCol></IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
}

const PostText: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
    );
}
const PostMedia: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Card Title</IonCardTitle>
                <IonCardSubtitle>Media</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
    );
}

export { PostDefault, PostText , PostMedia};
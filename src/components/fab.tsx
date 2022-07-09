import { IonButton, IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { addSharp, newspaperSharp, playCircleSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const FibPost: React.FC = () => {
    return (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
                <IonIcon icon={addSharp} />
            </IonFabButton>
            <IonFabList side="top">
                <Link to="/add-post">
                    <IonFabButton><IonIcon icon={newspaperSharp} /></IonFabButton>
                </Link>
                <Link to="/add-short">
                    <IonFabButton><IonIcon icon={playCircleSharp} /></IonFabButton>
                </Link>
            </IonFabList>
        </IonFab>
    )
}
export { FibPost };
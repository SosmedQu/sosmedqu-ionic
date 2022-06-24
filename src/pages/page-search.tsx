import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { } from 'ionicons/icons';
import { useState } from 'react';
import { } from 'react-router-dom';

const PageSearch: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <IonPage>
            {/* <HeaderPost /> */}
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                    </IonToolbar>
                </IonHeader>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Postingan</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="content">

                </div>
            </IonContent>
        </IonPage >
    )
}

export default PageSearch;
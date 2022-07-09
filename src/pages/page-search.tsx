import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { arrowBack, newspaper } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToolBarWithGoBack } from '../components/element/toolbar';
import { IconSM } from '../components/Utils/style/icon';
import { Searchbar } from '../components/Utils/style/searchbar';

const PageSearch: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const history = useHistory();
    function handleSearch(e: any) {
        console.log(e.detail.value)
    }
    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        window.location.reload();
        event.detail.complete();
    }
    return (
        <IonPage>
            {/* <HeaderPost /> */}
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonHeader>
                    <ToolBarWithGoBack backTo={() => history.goBack()}>
                        <Searchbar searchIcon={newspaper} color={'light'} animated debounce={2000} onIonChange={e => handleSearch(e)}></Searchbar>
                    </ToolBarWithGoBack>
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
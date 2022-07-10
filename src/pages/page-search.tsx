import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { arrowBack, newspaper, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ToolBarWithGoBack } from '../components/element/toolbar';
import { Post } from '../components/post/Post';
import { IconSM } from '../components/Utils/style/icon';
import { Searchbar } from '../components/Utils/style/searchbar';
import MyApi from '../helpers/my-api_helper';

const PageSearch: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const data: any = location.state;
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([{}])

    useEffect(() => {
        console.log(search)
        let tempSearchResult = data.filter((ele: any) => ele.caption.toLowerCase().includes(search.toLowerCase()))
        console.log(tempSearchResult);
        setSearchResult([...tempSearchResult])
    }, [search])

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        window.location.reload();
        event.detail.complete();
    }

    return (
        <IonPage>
            <IonHeader>
                <ToolBarWithGoBack backTo={() => history.goBack()}>
                    <Searchbar color={'light'} animated debounce={100} onIonChange={(e) => setSearch(e.detail.value!)}></Searchbar>
                </ToolBarWithGoBack>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {search && searchResult.map((val: any, i: any) => (
                    <Post data={val} />
                ))}
            </IonContent>
        </IonPage >
    )
}

export default PageSearch;
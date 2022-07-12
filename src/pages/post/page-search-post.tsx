import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Post } from '../../components/post/Post';
import { Searchbar } from '../../components/Utils/style/searchbar';

const PageSearchPost: React.FC = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([{}])

    const location = useLocation();
    useEffect(() => {
        const data: any = location.state;
        setSearchResult([...data!.filter((ele: any) => ele.caption.toLowerCase().includes(search.toLowerCase()))])
        // eslint-disable-next-line
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

export default PageSearchPost;
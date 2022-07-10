import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { arrowBack, newspaper, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToolBarWithGoBack } from '../components/element/toolbar';
import { Post } from '../components/post/Post';
import { IconSM } from '../components/Utils/style/icon';
import { Searchbar } from '../components/Utils/style/searchbar';
import MyApi from '../helpers/my-api_helper';

const PageSearch: React.FC = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([
        {

        }
    ])
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const api = new MyApi();
        const loadData = async () => {
            await api.getAllPost().then((response) => {
                setData(response.data.posts);
            }, err => {
                console.log(err)
            }).catch((err) => {
                console.log(err.response);
            }).finally(() => {
                // setShowLoading(false);
            });
        }
        loadData();
    }, [])

    useEffect(() => {
        console.log(search)
        let tempSearchResult = data.filter(ele => ele.caption.toLowerCase().includes(search.toLowerCase()))
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
                    <Searchbar searchIcon={newspaper} color={'light'} animated debounce={100} onIonChange={(e) => setSearch(e.detail.value!)}></Searchbar>
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
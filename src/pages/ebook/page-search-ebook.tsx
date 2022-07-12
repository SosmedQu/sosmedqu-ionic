import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonRow, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EbookCard } from '../../components/ebook';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Post } from '../../components/post/Post';
import { Searchbar } from '../../components/Utils/style/searchbar';

const PageSearchEbook: React.FC = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([{}])

    const location = useLocation();
    useEffect(() => {
        const data: any = location.state;
        let datasearch: any = data!.filter((ele: any) => ele.name.toLowerCase().includes(search.toLowerCase()));
        if (datasearch.length === 0) {
            datasearch = data!.filter((ele: any) => ele.writer.toLowerCase().includes(search.toLowerCase()));
        }
        setSearchResult([...datasearch])
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
                <IonGrid>
                    <IonRow className="">
                        {search && searchResult.map((val: any, i: any) => (
                            <IonCol size='6' key={i}>
                                <EbookCard data={val} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default PageSearchEbook;
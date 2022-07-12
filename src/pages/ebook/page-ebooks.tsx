import { IonCard, IonCol, IonContent, IonLabel, IonNote, IonPage, IonRow, IonGrid } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { SideBar } from '../../components/Menu';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Header } from '../../components/Utils/style/header';
import { useEffect, useState } from 'react';
import MyApi from '../../helpers/my-api_helper';
import { Loading } from '../../components/Utils/style/loading';
import AssetsApi from '../../helpers/assets-api_helper';
import styled from 'styled-components';
import { ImageEbook } from '../../components/Utils/style/image';
import { IconToolbar } from '../../components/Utils/style/icon';
import { EbookCard } from '../../components/ebook';


const PageEbooks: React.FC = () => {
    const history = useHistory();
    const [showLoading, setShowLoading] = useState(true);
    const [ebook, setEbook] = useState<any>()

    useEffect(() => {
        const api = new MyApi();
        const getebooks = async () => {
            await api.getEbooks().then((res) => {
                setEbook(res.data.ebooks);
            }, err => {
                console.log(err)
            }).finally(() => {
                setShowLoading(false);
            })
        }
        getebooks();
    }, [])
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <Header>
                    <ToolBarWithGoBack backTo={() => history.goBack()} title='E-BookQu'>
                        <IconToolbar slot='end' icon={searchOutline} onClick={() => history.push("/search/ebook", ebook)} />
                    </ToolBarWithGoBack>
                </Header>
                <IonContent fullscreen>
                    {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonButton className="btn-circle" onClick={() => history.push("/ebook/create")}>
                            <IonIcon icon={addSharp} />
                        </IonButton>
                    </IonFab > */}
                    <div className="content">
                        <Loading
                            cssClass='loading-post'
                            isOpen={showLoading}
                            spinner={'lines'}
                            onDidDismiss={() => setShowLoading(false)}
                            message={'Please wait...'}
                        />
                        <IonGrid>
                            <IonRow className="">
                                {ebook && ebook.map((val: any, i: any) => (
                                    <IonCol size="6" key={i}>
                                        <EbookCard data={val} />
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageEbooks
import { IonAvatar, IonButton, IonIcon, IonFab, IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter, IonGrid } from '@ionic/react';
import { addSharp, searchOutline } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
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

const CardEbook = styled(IonCard)`
    min-height: 320px;
`;

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
                        <IconToolbar slot='end' icon={searchOutline} onClick={() => history.push("/search/post", ebook)} />
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
                                    <IonCol size="6">
                                        <CardEbook onClick={() => history.push("/ebook/detail", val)} key={i} className="my-2 d-flex flex-column">
                                            <ImageEbook src={`${AssetsApi.URLImgEbooks}/${val.image}`} />
                                            <div className="ps-2">
                                                <IonLabel className='my-2' style={{ fontWeight: "bold", color: "var(--ion-color-dark)", display: "block" }}>{val.name}</IonLabel>
                                                <IonNote>{val.description.substring(0, 68)} ...</IonNote>
                                            </div>
                                        </CardEbook>
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
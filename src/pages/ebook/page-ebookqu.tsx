import { IonAvatar, IonButton, IonIcon, IonFab, IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { SideBar } from '../../components/Menu';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Header } from '../../components/Utils/style/header';
import { useEffect, useState } from 'react';
import MyApi from '../../helpers/my-api_helper';
import { Loading } from '../../components/Utils/style/loading';
import AssetsApi from '../../helpers/assets-api_helper';

const PageEbookQu: React.FC = () => {
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
    console.log(ebook);
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <Header>
                    <ToolBarWithGoBack backTo={() => history.goBack()} title='E-BookQu'>
                    </ToolBarWithGoBack>
                </Header>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Home Page</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonButton className="btn-circle" onClick={() => history.push("/ebook/create")}>
                            <IonIcon icon={addSharp} />
                        </IonButton>
                    </IonFab >
                    <div className="content">
                        <Loading
                            cssClass='loading-post'
                            isOpen={showLoading}
                            spinner={'lines'}
                            onDidDismiss={() => setShowLoading(false)}
                            message={'Please wait...'}
                        />
                        {ebook && ebook.map((val: any, i: any) => (
                            <IonCard onClick={() => history.push("/ebook/detail", val)} key={i} className="my-3">
                                <IonItem >
                                    <IonRow className="">
                                        <IonCol size="4">
                                            <IonImg src={`${AssetsApi.URLImgEbooks}/${val.image}`} />
                                        </IonCol>
                                        <IonCol size="8">
                                            <IonLabel>{val.name}</IonLabel>
                                            <IonNote>{val.description}</IonNote>
                                        </IonCol>
                                    </IonRow>
                                </IonItem>
                            </IonCard>
                        ))}
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageEbookQu;
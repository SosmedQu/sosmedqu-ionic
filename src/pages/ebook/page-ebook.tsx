import { IonAvatar, IonButton, IonIcon, IonFab, IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { SideBar } from '../../components/Menu';
import { ToolBarWithGoBack } from '../../components/element/toolbar';
import { Header } from '../../components/Utils/style/header';

const PageEbook: React.FC = () => {
    const history = useHistory();
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
                        <Link to="ebook/detail" className="link-item">
                            <IonCard>
                                <IonItem>
                                    <IonRow className="">
                                        <IonCol size="4">
                                            <IonImg src={process.env.PUBLIC_URL + "/assets/img/default-ebook.svg"} />
                                        </IonCol>
                                        <IonCol size="8">
                                            <IonLabel >E-Book 1</IonLabel>
                                            <IonNote>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, porro.</IonNote>
                                        </IonCol>
                                    </IonRow>
                                </IonItem>
                            </IonCard>
                        </Link>
                    </div>
                </IonContent>
            </IonPage>
        </>
    )
}

export default PageEbook;
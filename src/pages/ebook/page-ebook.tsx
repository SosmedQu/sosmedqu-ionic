import { IonAvatar, IonCard, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { FabAddEbook } from '../../components/fab';
import { DefaultHeader } from '../../components/header';
import { SideBar } from '../../components/Menu';

const PageEbook: React.FC = () => {
    return (
        <>
            <SideBar />
            <IonPage id="main">
                <DefaultHeader />
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Home Page</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <FabAddEbook />
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
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { } from '../../components/post/Post';
import { useState } from 'react';
import { SideBar } from '../../components/menu/Menu';
import { arrowBackSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';


const PageAddPost: React.FC = () => {
    const [text, setText] = useState<string>();
    return (
        <>
            <SideBar />
            <IonPage id="main">
                {/* <HeaderPost /> */}
                <IonHeader>
                    <IonToolbar className="px-3">
                        <Link to="/home">
                            <IonIcon icon={arrowBackSharp} style={{ "font-size": "24px" }}></IonIcon>
                        </Link>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Postingan</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <form action="" className='form-post'>
                        <div className="box upload-media">

                        </div>
                        <IonItem>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea rows={3} value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
                        </IonItem>
                    </form>
                </IonContent>
            </IonPage >
        </>
    );
};



export default PageAddPost;

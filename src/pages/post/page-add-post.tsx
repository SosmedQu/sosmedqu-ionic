import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { } from '../../components/post/Post';
import { useState } from 'react';
import { SideBar } from '../../components/menu/Menu';
import { arrowBackSharp, cloudUploadSharp, imageSharp } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';


const PageAddPost: React.FC = () => {
    const [text, setText] = useState<string>();
    const [image, setImage] = useState<string>();
    const [privasi, setPrivasi] = useState<string>();

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            setImage(cameraResult.dataUrl);
            // console.log(cameraResult);
        } catch (e: any) {
            console.log(e);
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        
    }
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
                    <form className='form-post' onSubmit={e => onSubmit(e)}>
                        <IonRow className="my-2" onClick={takePicture}>
                            <IonImg src={image ? image : process.env.PUBLIC_URL + "/assets/img/no-picture.svg"} style={{ height: "120px" }}></IonImg>
                        </IonRow>
                        <IonItem>
                            <IonLabel position="floating">Caption</IonLabel>
                            <IonTextarea rows={3} value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
                        </IonItem>
                        <IonItem>
                            <IonSelect placeholder="Pilih privasi" onIonChange={e => setPrivasi(e.detail.value!)}>
                                <IonSelectOption value="personal">Personal</IonSelectOption>
                                <IonSelectOption value="only-friend">Only Friend</IonSelectOption>
                                <IonSelectOption value="public">Public</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonRow className="justify-content-center my-4">
                            <IonButton type='submit' color='success'>
                                <IonIcon slot="start" icon={cloudUploadSharp} />
                                <IonLabel>Upload Post</IonLabel>
                            </IonButton>
                        </IonRow>
                    </form>
                </IonContent>
            </IonPage >
        </>
    );
};



export default PageAddPost;

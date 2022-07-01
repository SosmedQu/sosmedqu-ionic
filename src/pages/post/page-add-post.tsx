import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { } from '../../components/post/Post';
import { useState } from 'react';
import { SideBar } from '../../components/menu/Menu';
import { arrowBackSharp, cloudUploadSharp, imageSharp } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURItoBlob, dataURLtoFile } from '../../helpers/converter'
import MyApi from '../../helpers/my-api';


const PageAddPost: React.FC = () => {
    const [text, setText] = useState<string>();
    const [image, setImage] = useState<Blob[]>([]);
    const [privasi, setPrivasi] = useState<string>();
    const [categoryId, setCategoryId] = useState<number>();
    const history = useHistory();

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURItoBlob(cameraResult.dataUrl);
            const objectUrl = URL.createObjectURL(convert);
            const inputFile = document.getElementById("postFiles");

            let myimage = new Image();
            myimage.src = objectUrl;
            document.getElementById('myimage')?.appendChild(myimage);
            setImage([...image, convert]);
        } catch (e: any) {
            console.log(e);
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(e.target);
        const formData = new FormData(e.target);
        image.forEach((value) => {
            formData.append("postFiles", value);
        })
        const api = new MyApi();
        api.uploadPost(formData).then((res) => {
            console.log(res);
        }, err => {
            console.log(err.response);
        })
    }
    return (
        <>
            <SideBar />
            <IonPage id="main">
                {/* <HeaderPost /> */}
                <IonHeader>
                    <IonToolbar className="px-3">
                        <div className="ion-margin">
                            <IonIcon icon={arrowBackSharp} className="border-test icon-navigation" style={{ "font-size": "24px" }}></IonIcon>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Postingan</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <form className='form-post' id="form-post" onSubmit={e => onSubmit(e)} encType="multipart/form-data">
                        <IonRow className="my-2" onClick={takePicture}>
                            <IonImg src={process.env.PUBLIC_URL + "/assets/img/no-picture.svg"} style={{ height: "120px" }}></IonImg>
                        </IonRow>
                        <div id="myimage">

                        </div>
                        <IonItem>
                            <IonLabel position="floating">Caption</IonLabel>
                            <IonTextarea rows={3} value={text} onIonChange={e => setText(e.detail.value!)} name="caption"></IonTextarea>
                        </IonItem>

                        <IonSelect placeholder="Pilih privasi" value={privasi} onIonChange={e => setPrivasi(e.detail.value!)} name="privacy">
                            <IonSelectOption value="personal">Personal</IonSelectOption>
                            <IonSelectOption value="only-friend">Only Friend</IonSelectOption>
                            <IonSelectOption value="public">Public</IonSelectOption>
                        </IonSelect>

                        <IonSelect placeholder="Pilih category" value={categoryId} onIonChange={e => setCategoryId(e.detail.value!)} name="categoryId">
                            <IonSelectOption value="1">Tekhnologi</IonSelectOption>
                            <IonSelectOption value="2">Ekonomi</IonSelectOption>
                            <IonSelectOption value="3">Management</IonSelectOption>
                        </IonSelect>
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

import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { } from '../../components/post/Post';
import { useRef, useState } from 'react';
import { SideBar } from '../../components/menu/Menu';
import { arrowBackSharp, camera, cloudUploadSharp, sendOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURItoBlob } from '../../helpers/converter'
import MyApi from '../../helpers/my-api';
import { SliderImage } from '../../components/image-slider';


const PageAddPost: React.FC = () => {
    const [text, setText] = useState<string>();
    const [image, setImage] = useState<Blob[]>([]);
    const [privasi, setPrivasi] = useState<string>();
    const [categoryId, setCategoryId] = useState<number>();
    const [imgPrev, setImgPrev] = useState<any>([]);
    const history = useHistory();

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURItoBlob(cameraResult.dataUrl);
            const objectUrl = URL.createObjectURL(convert);
            setImgPrev([...imgPrev, objectUrl]);
            // let myimage = new Image();
            // myimage.src = objectUrl;
            // document.getElementById('myimage')?.appendChild(myimage);
            setImage([...image, convert]);
        } catch (e: any) {
            console.log(e);
        }
    }
    const uploadVideo = useRef<HTMLInputElement>(null);
    // const takeVideo = async () => {
    //     uploadVideo.current?.click()
    //     const video = await uploadVideo.current?.files![0];

    // }

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
                            <IonIcon onClick={() => history.goBack()} icon={arrowBackSharp} className="icon-navigation"></IonIcon>
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
                        <IonRow className="my-2">
                            <IonButton onClick={takePicture}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
                            {/* <IonButton onClick={takeVideo}>
                                <IonLabel>Take Video</IonLabel>
                            </IonButton> */}
                            <input type="file" style={{ display: "none" }} id="video" accept='video/*' ref={uploadVideo} />
                        </IonRow>
                        <div id="myimage">
                            <SliderImage data={imgPrev} />
                        </div>
                        <IonItem>
                            <IonLabel position="floating">Caption</IonLabel>
                            <IonTextarea rows={3} value={text} onIonChange={e => setText(e.detail.value!)} name="caption"></IonTextarea>
                        </IonItem>

                        <IonSelect className='mt-3' placeholder="Pilih privasi" value={privasi} onIonChange={e => setPrivasi(e.detail.value!)} name="privacy">
                            <IonSelectOption value="personal">Personal</IonSelectOption>
                            <IonSelectOption value="only-friend">Only Friend</IonSelectOption>
                            <IonSelectOption value="public">Public</IonSelectOption>
                        </IonSelect>

                        <IonSelect className='mt-3' placeholder="Pilih category" value={categoryId} onIonChange={e => setCategoryId(e.detail.value!)} name="categoryId">
                            <IonSelectOption value="1">Tekhnologi</IonSelectOption>
                            <IonSelectOption value="2">Ekonomi</IonSelectOption>
                            <IonSelectOption value="3">Management</IonSelectOption>
                        </IonSelect>
                        <IonRow className="justify-content-center mt-4">
                            <IonButton type='submit'>
                                <IonIcon slot="end" icon={sendOutline} />
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

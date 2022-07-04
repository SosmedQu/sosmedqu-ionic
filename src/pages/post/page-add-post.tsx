import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, NavContext } from '@ionic/react';
import { } from '../../components/post/Post';
import { useCallback, useContext, useRef, useState } from 'react';
import { SideBar } from '../../components/Menu';
import { arrowBackSharp, camera, cloudUploadSharp, sendOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURItoBlob } from '../../helpers/converter'
import MyApi from '../../helpers/my-api';
import { SliderImage } from '../../components/image-slider';
import { AlertOk } from '../../components/Alert';
import IAlert from '../../interface/IAlert';


const PageAddPost: React.FC = () => {
    const [text, setText] = useState<string>();
    const [image, setImage] = useState<Blob[]>([]);
    const [privasi, setPrivasi] = useState<string>();
    const [categoryId, setCategoryId] = useState<number>();
    const [imgPrev, setImgPrev] = useState<any>([]);
    const history = useHistory();
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });
    const { navigate } = useContext(NavContext);

    // Call this function when required to redirect with the back animation
    const redirect = useCallback(
        (url: string) => navigate(url, 'back'),
        [navigate]
    );

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURItoBlob(cameraResult.dataUrl);
            setImgPrev([...imgPrev, cameraResult.dataUrl]);
            setImage([...image, convert]);
        } catch (e: any) {
            console.log(e);
        }
    }
    // const uploadVideo = useRef<HTMLInputElement>(null);
    // const takeVideo = () => {
    //     uploadVideo.current?.click();
    //     const fileUp = uploadVideo.current?.files![0];
    //     const reader = new FileReader()
    //     if (fileUp?.name) {
    //         console.log(fileUp)
    //         setImgPrev([...imgPrev, reader.readAsDataURL(fileUp)]);
    //         console.log(reader.readAsDataURL(fileUp))
    //     }
    // }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        image.forEach((value) => {
            formData.append("postFiles", value);
        })
        const api = new MyApi();
        api.uploadPost(formData).then((res) => {
            console.log(res.data);
            setAlert({
                showAlert: true,
                header: "Berhasil",
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                type: "success",
                message: res.data.msg,
                okClick: () => {
                    redirect("/post")
                }
            })
        }, err => {
            setAlert({
                showAlert: true,
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                header: "Gagal",
                type: "failed",
                message: err.response.data.msg,
                okClick: () => { setAlert({ showAlert: false }) }
            })
        })
    }
    return (
        <>
            <SideBar />
            <IonPage id="main">
                {/* <HeaderPost /> */}
                <IonHeader>
                    <IonToolbar className="ion-padding p-0" color={'primary'} >
                        <IonIcon onClick={() => history.goBack()} icon={arrowBackSharp} className="icon-navigation"></IonIcon>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Postingan</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <AlertOk data={alert} />
                    <form className='form-post' id="form-post" onSubmit={e => onSubmit(e)} encType="multipart/form-data">
                        <IonRow className="my-2">
                            {/* <IonButton onClick={takeVideo}>
                                <IonLabel>Take Video</IonLabel>
                            </IonButton> */}
                            {/* <input type="file" style={{ display: "none" }} id="video" accept='video/*' ref={uploadVideo} /> */}
                        </IonRow>
                        <div className='d-flex justify-content-center align-items-center'>
                            <IonButton onClick={takePicture}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
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

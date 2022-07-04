import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, NavContext, useIonViewWillEnter } from '@ionic/react';
import { } from '../../components/post/Post';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SideBar } from '../../components/Menu';
import { arrowBackSharp, camera, sendOutline } from 'ionicons/icons';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Camera, CameraResultType } from '@capacitor/camera';
import { dataURLtoFile } from '../../helpers/converter'
import MyApi from '../../helpers/my-api';
import { SliderImage } from '../../components/image-slider';
import { AlertOk } from '../../components/Alert';
import IAlert from '../../interface/IAlert';
import { ICUPost } from '../../interface/post';
import { navigate } from '../../helpers/navigation_helper';


const api = new MyApi();
const EditPost: React.FC = () => {
    const [data, setData] = useState<ICUPost>();
    const [image, setImage] = useState<Blob[]>([])
    const { id }: { id: any } = useParams();
    useEffect(() => {
        api.getOnePost(id).then((response) => {
            console.log(response);
            setData(response.data.post);
            setShowLoading(false);
        }, err => {
            console.log(err);
        })
    }, [])
    const [showLoading, setShowLoading] = useState(true);
    const [imgPrev, setImgPrev] = useState<any>([]);
    const history = useHistory();
    const [alert, setAlert] = useState<IAlert>({ showAlert: false });

    const takePicture = async () => {
        try {
            const cameraResult = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
            })
            const convert = dataURLtoFile(cameraResult.dataUrl);
            setImage([...image, convert]);
            setImgPrev([...imgPrev, cameraResult.dataUrl]);
        } catch (e: any) {
            console.log(e);
        }
    }
    const uploadVideo = useRef<HTMLInputElement>(null);
    const takeVideo = () => {
        uploadVideo.current?.click();
        const fileUp = uploadVideo.current?.files![0];
        const reader = new FileReader()
        if (fileUp?.name) {
            console.log(fileUp)
            setImgPrev([...imgPrev, reader.readAsDataURL(fileUp)]);
            console.log(reader.readAsDataURL(fileUp))
        }
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        image.forEach((value) => {
            formData.append("postFiles", value);
        })
        api.updatePost(formData).then((res) => {
            setAlert({
                showAlert: true,
                header: "Berhasil",
                onDidDismiss: () => { setAlert({ showAlert: false }) },
                type: "success",
                message: res.data.msg,
                okClick: () => {
                    navigate("/post")
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
                    <IonLoading
                        cssClass='my-custom-class'
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}
                        duration={5000}
                    />
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Postingan</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <AlertOk data={alert} />
                    <form className='form-post' id="form-post" onSubmit={e => onSubmit(e)} encType="multipart/form-data">
                        <IonInput value={id} name="id" hidden></IonInput>
                        <IonRow className="my-2">
                            <IonButton onClick={takePicture}>
                                <IonIcon icon={camera} slot="start"></IonIcon>
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
                            {/* <IonButton onClick={takeVideo}>
                                <IonLabel>Take Video</IonLabel>
                            </IonButton> */}
                            {/* <input type="file" style={{ display: "none" }} id="video" accept='video/*' ref={uploadVideo} /> */}
                        </IonRow>
                        <div id="myimage">
                            <SliderImage data={imgPrev} />
                        </div>
                        <IonItem>
                            <IonLabel position="floating">Caption</IonLabel>
                            <IonTextarea rows={3} value={data?.caption} name="caption"></IonTextarea>
                        </IonItem>

                        <IonSelect className='mt-3' placeholder="Pilih privasi" value={data?.privacy} name="privacy">
                            <IonSelectOption value="personal">Personal</IonSelectOption>
                            <IonSelectOption value="only-friend">Only Friend</IonSelectOption>
                            <IonSelectOption value="public">Public</IonSelectOption>
                        </IonSelect>

                        <IonSelect className='mt-3' placeholder="Pilih category" value={`${data?.categoryId}`} name="categoryId">
                            <IonSelectOption value="1">Tekhnologi</IonSelectOption>
                            <IonSelectOption value="2">Ekonomi</IonSelectOption>
                            <IonSelectOption value="3">Management</IonSelectOption>
                        </IonSelect>
                        <IonRow className="justify-content-center mt-4">
                            <IonButton type='submit'>
                                <IonIcon slot="end" icon={sendOutline} />
                                <IonLabel>Edit Post</IonLabel>
                            </IonButton>
                        </IonRow>
                    </form>
                </IonContent>
            </IonPage >
        </>
    );
};



export default EditPost;
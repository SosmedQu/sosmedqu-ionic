import { useState } from 'react';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { dataURItoBlob } from './converter_helper';

export function TakePictures() {
    const [photos, setPhotos] = useState<any[]>([]);
    const [photosAsBlob, setPhotosAsBlob] = useState<Blob[]>([]);
    const [photo, setPhoto] = useState<string>();
    const takePhoto = async () => {
        const take = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
        });
        const convert = dataURItoBlob(take.dataUrl)
        setPhotos([...photos, take.dataUrl]);
        setPhotosAsBlob([...photosAsBlob, convert]);
        setPhoto(take.dataUrl)
    };

    return {
        photo,
        photos,
        photosAsBlob,
        takePhoto,
    };
}
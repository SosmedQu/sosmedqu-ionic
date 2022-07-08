import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

export function TakePictures() {
    const [photos, setPhotos] = useState<any[]>([]);
    const [photo, setPhoto] = useState<string>();
    const takePhoto = async () => {
        const take = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 100,
        });
        setPhotos([...photos, take.dataUrl]);
        setPhoto(take.dataUrl)
    };

    return {
        photo,
        photos,
        takePhoto,
    };
}
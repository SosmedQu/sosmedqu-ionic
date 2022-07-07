import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export function TakePictures() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const [photo, setPhoto] = useState<UserPhoto>();
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + `.${photo.format}`;
        const newPhotos = [
            {
                filepath: fileName,
                webviewPath: photo.webPath,
            },
            ...photos,
        ];
        setPhotos(newPhotos);
        setPhoto({
            filepath: fileName,
            webviewPath: photo.webPath
        })
    };

    return {
        photo,
        photos,
        takePhoto,
    };
}
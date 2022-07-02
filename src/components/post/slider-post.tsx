import { IonImg, IonSlide, IonSlides } from '@ionic/react';
import { } from 'ionicons/icons';
import { } from 'react-router-dom';

const SliderPost: React.FC<{ data: any }> = (props) => {
    const slideOpts = {
        speed: 500
    }
    return (
        <IonSlides pager={true} options={slideOpts} style={{ width: "90vw" }}>
            {props.data.map((file: any) => (
                <IonSlide>
                    <IonImg src={"http://localhost:3000/posts/" + file.fileName} className="" />
                </IonSlide>
            ))
            }
        </IonSlides>
    )
}

export default SliderPost;
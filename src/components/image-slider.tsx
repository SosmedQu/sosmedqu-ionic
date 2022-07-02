import { IonCard, IonImg, IonSlide, IonSlides } from '@ionic/react';
import { } from 'react-router-dom';

const SliderImage: React.FC<{ data: any }> = (props) => {
    const slideOpts = {
        speed: 500
    }
    return (
        <IonCard>
            {
                props.data.length == 1
                    ?
                    props.data.map((file: any) => (
                        <IonImg src={file} className="" />
                    ))
                    :
                    <IonSlides pager={true} options={slideOpts} style={{ width: "90vw" }}>
                        {props.data.map((file: any) => (
                            <IonSlide>
                                <IonImg src={file} className="" />
                            </IonSlide>
                        ))}
                    </IonSlides>
            }
        </IonCard>
    );
}

export { SliderImage };
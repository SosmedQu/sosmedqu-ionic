import { IonCard, IonImg, IonSlide, IonSlides } from '@ionic/react';
import { } from 'react-router-dom';
import styled from 'styled-components';


const Image = styled(IonImg)`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;

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
                        <Image src={file} />
                    ))
                    :
                    <IonSlides pager={true} options={slideOpts}>
                        {props.data.map((file: any) => (
                            <IonSlide>
                                <Image src={file} />
                            </IonSlide>
                        ))}
                    </IonSlides>
            }
        </IonCard>
    );
}

export { SliderImage };
import { IonCard, IonImg, IonSlide, IonSlides } from '@ionic/react';
import { } from 'react-router-dom';
import styled from 'styled-components';
import AssetsApi from '../helpers/assets-api_helper';


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
                    props.data.map((file: any, i: any) => {
                        if (typeof file == 'object') {
                            return (
                                file.map((e: any, i1: any) => (
                                    <Image key={i1} src={`${AssetsApi.URLImgPost}/${e.fileName}`} />
                                ))
                            )
                        } else {
                            return (
                                <Image key={i} src={file} />
                            )
                        }
                    })
                    :
                    <IonSlides pager={true} options={slideOpts}>
                        {props.data.map((file: any, i2: any) => (
                            <IonSlide key={i2}>
                                {
                                    typeof file == 'object'
                                        ? file.map((e: any, i3: any) => (
                                            <Image key={i3} src={`${AssetsApi.URLImgPost}/${e.fileName}`} />
                                        ))
                                        : <Image src={file} />
                                }
                            </IonSlide>
                        ))}
                    </IonSlides>
            }
        </IonCard>
    );
}

export { SliderImage };
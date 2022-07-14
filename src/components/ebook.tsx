import { IonCard, IonCol, IonGrid, IonLabel, IonNote, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AssetsApi from "../helpers/assets-api_helper";
import { ImageEbook } from "./Utils/style/image";

const CardEbook = styled(IonCard)`
    min-height: 320px;
`;


export const EbookCard: React.FC<{ data: any }> = (props) => {
    const history = useHistory();
    return (
        <CardEbook onClick={() => history.push("/ebook/detail", props.data)} className="my-2 d-flex flex-column">
            <ImageEbook src={`${AssetsApi.URLImgEbooks}/${props.data.image}`} />
            <div className="ps-2">
                <IonLabel className='my-2' style={{ fontWeight: "bold", color: "var(--ion-color-dark)", display: "block" }}>{props.data.name.substring(0, 24)}... </IonLabel>
                <IonNote>{props.data.description.substring(0, 68)} ...</IonNote>
            </div>
        </CardEbook>
    )
}
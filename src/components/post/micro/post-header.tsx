import { IonAvatar, IonImg, IonText, IonIcon } from "@ionic/react"
import { ellipsisVerticalSharp } from "ionicons/icons"
import { useHistory } from "react-router"
import styled from "styled-components"
import AssetsApi from "../../../helpers/assets-api_helper"
import Item from "../../Utils/style/item"
import Label from "../../Utils/style/label"
const TitlePost = styled.div`
    .privacy{
        font-size: 12px;
    }
`;

interface IPostHeader {
    id: string;
    image: string;
    username: string;
    privacy: string;
    onClickMore: () => void;
}
export const PostHeader: React.FC<IPostHeader> = (props) => {
    const history = useHistory();
    return (
        <Item>
            <IonAvatar slot='start'>
                <IonImg src={`${AssetsApi.URLImgProfile}/${props.image}`} />
            </IonAvatar>
            <TitlePost onClick={() => history.push("/profile/view", props.id)}>
                <Label>{props.username ? props.username : "User Anonymous"}</Label>
                <IonText className='privacy'>{props.privacy}</IonText>
            </TitlePost>
            <IonIcon slot="end" style={{ fontSize: "24px", cursor: "pointer" }} icon={ellipsisVerticalSharp} onClick={props.onClickMore}></IonIcon>
        </Item>
    )
}
import { IonButton } from "@ionic/react"
import { thumbsUpSharp, chatbubblesSharp } from "ionicons/icons"
import { IconSM } from "../../Utils/style/icon"
import Item from "../../Utils/style/item"
import Label from "../../Utils/style/label"

export const ResponsePost: React.FC = () => {
    return (
        <Item className='mt-3'>
            <IonButton slot='start' color={'light'}>
                <IconSM color='secondary' slot='start' icon={thumbsUpSharp}></IconSM>
                <Label>10k</Label>
            </IonButton>
            <IonButton slot="end" color={'light'}>
                <IconSM color='secondary' slot='start' icon={chatbubblesSharp}></IconSM>
                <Label>10k</Label>
            </IonButton>
        </Item>
    )
}
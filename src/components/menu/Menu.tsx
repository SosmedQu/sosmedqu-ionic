import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { bookSharp, calendarSharp, chatbubbleEllipsesOutline, menuSharp, notificationsOutline, trophyOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import '../component.css'

const TopBar: React.FC = () => {
    return (
        <div id="nav-top">
            <IonMenuToggle>
                <IonIcon icon={menuSharp} style={{ "font-size": "24px" }}></IonIcon>
            </IonMenuToggle>
            <div>
                <Link to="/chatting">
                    <IonIcon icon={chatbubbleEllipsesOutline} style={{ "font-size": "24px", "margin-right": "8px" }}></IonIcon>
                </Link>
                <Link to="/rank">
                    <IonIcon icon={trophyOutline} style={{ "font-size": "24px", "margin-right": "8px" }}></IonIcon>
                </Link>
                <Link to="/notif">
                    <IonIcon icon={notificationsOutline} style={{ "font-size": "24px" }}></IonIcon>
                </Link>
            </div>
        </div>
    )
}

const SideBar: React.FC = () => {
    return (
        <IonMenu side="start" menuId="first" contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SosmedQu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem href='/home'>
                        <IonIcon icon={calendarSharp} className="me-2"></IonIcon>
                        <IonLabel>JadwalQu</IonLabel>
                    </IonItem>
                    <IonItem href='/home'>
                        <IonIcon icon={bookSharp} className="me-2"></IonIcon>
                        <IonLabel>EbookQu</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export { TopBar, SideBar };
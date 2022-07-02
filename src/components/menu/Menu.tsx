import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/react';
import { bookSharp, calendarSharp, chatbubbleEllipsesOutline, logOutOutline, logOutSharp, menuSharp, notificationsOutline, trophyOutline } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import MyApi from '../../helpers/my-api';
import '../component.css'

const api = new MyApi();

const TopBar: React.FC = () => {
    return (
        <div id="nav-top">
            <IonMenuToggle>
                <IonIcon icon={menuSharp} className="icon-navigation"></IonIcon>
            </IonMenuToggle>
            <div>
                <Link to="/chatting">
                    <IonIcon icon={chatbubbleEllipsesOutline} className="me-2 icon-navigation"></IonIcon>
                </Link>
                <Link to="/rank">
                    <IonIcon icon={trophyOutline} className="me-2 icon-navigation"></IonIcon>
                </Link>
                <Link to="/notif">
                    <IonIcon icon={notificationsOutline} className="me-2 icon-navigation"></IonIcon>
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
                        <IonIcon icon={calendarSharp} className="me-2 icon-navigation"></IonIcon>
                        <IonLabel>JadwalQu</IonLabel>
                    </IonItem>
                    <IonItem href='/ebook'>
                        <IonIcon icon={bookSharp} className="me-2 icon-navigation"></IonIcon>
                        <IonLabel>EbookQu</IonLabel>
                    </IonItem>
                    <IonItem href="/logout">
                        <IonIcon icon={logOutOutline} className="me-2 icon-navigation"></IonIcon>
                        <IonLabel>Logout</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export { TopBar, SideBar };
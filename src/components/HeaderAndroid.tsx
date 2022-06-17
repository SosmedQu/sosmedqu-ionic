import { IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { chatbubbleEllipsesOutline, menuSharp, notificationsOutline, trophyOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './component.css'

const HeaderAndroid: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <div id="nav-top">
                    <IonIcon icon={menuSharp} style={{ "font-size": "24px" }}></IonIcon>
                    <div >
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
            </IonToolbar>
        </IonHeader>
    )
}

export default HeaderAndroid;
import { IonAvatar, IonButton, IonCard, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonTitle } from '@ionic/react';
import { schoolSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AssetsApi from '../helpers/assets-api_helper';
import Env from '../helpers/env_helper';
import IProfile from '../interface/IProfile';
import { IconMD } from './Utils/element/icon';
import Color from './Utils/style/color';
import { FontFamily, FontSize } from './Utils/style/font';

const ProfileHeader = styled.div`
    position: relative;
    padding: 0 0 90px 0;

    .box{
        background-color: ${Color.primary.blue};
        height: 20vh;
        border-radius: 0 0 20% 20%;
    }

    .box-card {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding 20px 0 0 0;
    }
`;
const ProfileCard = styled(IonCard)`
    padding: 48px 24px;
    border-radius: 16px;
    display: grid;
    grid-template-areas:    "foto nama"
                            "foto followers";
    grid-template-columns: 2fr 3fr;
    
    .foto{
        grid-area: foto;
        height: 100px;
        width: 100px;
    }

    .nama{
        grid-area:nama;
        font-family: ${FontFamily.primary};
        font-size: ${FontSize.Mobile.H3};
        line-height: ${FontSize.Mobile.H3};
        font-weight: 800;
        overflow: hidden;
        display: -webkit-box; /* fallback */
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .followers{
        grid-area:followers;
        margin: 24px 0 0;
        span{
            font-weight: bolder;
            font-size: 24px
        }
    }
`;


const TopStudent = styled.div`
    position: absolute;
    top: 0;
    left: 30px;
    z-index: 100;
    background-color: ${Color.primary.red};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 16px 32px;

    .title {
        color: ${Color.primary.white};
        margin: 0;
        font-size: 20px;
        font-weight: 700;
    }
`;

const MyProfile: React.FC<{ data: IProfile }> = (props) => {
    console.log(props.data)
    console.log(props.data.roleId === 2)
    const history = useHistory();
    const handleUpgrade = () => {
        history.push("/upgrade-student", props.data)
    }
    return (
        <ProfileHeader>
            <div className="box" />
            <div className="box-card">
                {/* <TopStudent>
                    <p className='title'>Top Student</p>
                </TopStudent> */}
                <ProfileCard>
                    <IonAvatar class='foto'>
                        <IonImg src={`${AssetsApi.URLImgProfile}/${props.data.image}`}></IonImg>
                    </IonAvatar>
                    <p className="px-0 nama">{props.data.username}</p>
                    {props.data.roleId == 2
                        ? (<IonTitle className="px-0 followers">Followers <span>99.9k</span></IonTitle>)
                        : <IonButton className="followers" color={'warning'} onClick={() => handleUpgrade()}>
                            <IconMD icon={schoolSharp} color={'light'} slot="start" ></IconMD>
                            <IonLabel color={'light'}>Menjadi Student</IonLabel>
                        </IonButton>
                    }
                </ProfileCard>
            </div>
        </ProfileHeader>
    )
}

export default MyProfile;
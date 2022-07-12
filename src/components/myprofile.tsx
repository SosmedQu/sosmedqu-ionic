import { IonAvatar, IonButton, IonCard, IonIcon, IonImg, IonLabel } from '@ionic/react';
import { heartOutline, male, schoolSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AssetsApi from '../helpers/assets-api_helper';
import IProfile from '../interface/IProfile';
import { IconMD } from './Utils/style/icon';
import Color from './Utils/style/color';
import { FontFamily, FontSize } from './Utils/style/font';
import { getdataToken } from '../interface/IdataToken';
import Label from './Utils/style/label';

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
        padding 10px 0 0 0;
    }
`;
const ProfileCard = styled(IonCard)`
    padding: 24px 24px;
    border-radius: 16px;
    display: grid;
    grid-template-areas:    "foto nama"
                            "foto followers";
    grid-template-columns: 2fr 3fr;
    
    .foto{
        grid-area: foto;
        position: relative;
        height: 100px;
        width: 100px;
    }

    .nama{
        grid-area:nama;
        font-family: ${FontFamily.primary};
        font-size: 18px;
        line-height: ${FontSize.Mobile.H3};
        font-weight: 900;
        overflow: hidden;
        display: -webkit-box; /* fallback */
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .followers{
        grid-area:followers;
        margin: 0;
    }
    .studyAt{
        font-wight: lighter;
        margin: 0;
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
    padding: 8px 24px;
    .title {
        color: ${Color.primary.white};
        margin: 0;
        font-size: 14px;
        font-weight: 700;
    }
`;

const Gender = styled(IonIcon)`
    position: absolute;
    right:0;
    font-size: 18px;
    font-weight: 800;
    color: var(--ion-color-light);
    background-color: var(--ion-color-primary);
    border-radius: 50%;
    padding: 8px;
`;

const ButtonFollow = styled(IonButton)`
    
`;

const MyProfile: React.FC<{ data: IProfile, clickFollow?: () => void }> = (props) => {
    const history = useHistory();
    const dataToken = getdataToken();
    const handleUpgrade = () => {
        history.push("/upgrade-student", props.data)
    }
    return (
        <ProfileHeader>
            <div className="box" />
            <div className="box-card">
                <TopStudent>
                    <p className='title'>Top Student</p>
                </TopStudent>
                <ProfileCard>
                    <IonAvatar class='foto'>
                        <Gender icon={male}></Gender>
                        <IonImg src={`${AssetsApi.URLImgProfile}/${props.data.image}`}></IonImg>
                    </IonAvatar>
                    <p className="px-0 nama">{props.data.username}</p>
                    {props.data.roleId === 2
                        ? (
                            <div>
                                <p className='studyAt'>{props.data.studyAt}</p>
                                <p className="px-0 followers">Followers <span>99.9k</span></p>
                                {props.data.id != dataToken?.userId &&
                                    <div className="text-end">
                                        <ButtonFollow>
                                            <IonIcon slot="start" icon={heartOutline}></IonIcon>
                                            <Label>Follow</Label>
                                        </ButtonFollow>
                                    </div>
                                }
                            </div>
                        )
                        :
                        <IonButton className="followers" color={'secondary'} onClick={() => handleUpgrade()}>
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
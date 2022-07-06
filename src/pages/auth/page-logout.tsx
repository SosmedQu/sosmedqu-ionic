import { } from '@ionic/react';
import { } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MyApi from '../../helpers/my-api_helper';

const Logout: React.FC = () => {
    const history = useHistory();
    const api = new MyApi();

    api.logout().then((res) => {
        history.push("/login");
    });
    return (<>

    </>)
}

export default Logout;
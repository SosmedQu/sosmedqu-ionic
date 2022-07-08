import { } from '@ionic/react';
import { } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from 'typescript-cookie'

function ProtectedRoute({ children, ...rest }: any) {
    let auth = getCookie("accessToken") ? true : false;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;
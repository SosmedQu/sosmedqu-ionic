import { Redirect, Route } from 'react-router-dom';
// import MyApi from './helpers/my-api_helper';
import { getdataToken } from './interface/IdataToken';


function ProtectedRoute({ children, ...rest }: any) {
    const token = getdataToken();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
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
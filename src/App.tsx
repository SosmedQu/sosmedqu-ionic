import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albumsSharp, ellipse, homeSharp, personSharp, square, triangle } from 'ionicons/icons';
import HomePage from './pages/home-page';
import Post from './pages/post';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import LoginEmail from './pages/auth/login-email';
import Register from './pages/auth/register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/login" component={Login}/>
          <Route path="/loginEmail" component={LoginEmail}/>
          <Route path="/register" component={Register}/>
          <Route path="/register/next" component={LoginEmail} exact/>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home Page</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Post" href="/Post">
            <IonIcon icon={albumsSharp} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personSharp} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

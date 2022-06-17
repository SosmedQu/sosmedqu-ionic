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
import { albumsSharp, ellipse, homeSharp, newspaperSharp, personSharp, playCircleSharp, square, triangle } from 'ionicons/icons';
import HomePage from './pages/home-page';
import {Post, PostText} from './pages/post';
import Profile from './pages/profile';
import {Login, LoginEmail, Register, VerifikasiEmail, CreatePassword} from './components/auth';
import ShortVideo from './pages/short-video';
import { Chatting, ChattingDetail } from './components/chatting';

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
          <Route path="/register/verifikasi" component={VerifikasiEmail}/>
          <Route path="/register/create-password" component={CreatePassword}/>
          <Route path="/chatting" component={Chatting}/>
          <Route path="/chatting-detail" component={ChattingDetail}/>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
          <Route exact path="/post-text">
            <PostText />
          </Route>
          <Route exact path="/short-video">
            <ShortVideo />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="nav-bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="post-text" href="/post-text">
            <IonIcon icon={newspaperSharp} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="short-video" href="/short-video">
            <IonIcon icon={playCircleSharp} />
            <IonLabel>Short</IonLabel>
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

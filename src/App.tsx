import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/page-home';
import PagePost from './pages/post/page-post';
import PageSearch from './pages/page-search';
import Profile from './pages/page-profile';
import Register from './pages/auth/page-register';
import LoginWithEmail from './pages/auth/page-login-email';
import Login from './pages/auth/page-main-login';
import CreatePassword from './pages/auth/page-create-password'
import VerifikasiEmail from './pages/auth/page-verify-email';
import ShortVideo from './pages/page-short-video';
import { Chatting, ChattingDetail } from './components/chatting/chatting';

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

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// CSS SosmedQu
import './theme/app.css';
import { homeSharp, newspaperSharp, playCircleSharp, searchSharp, personSharp } from 'ionicons/icons';
import VerifyAccount from './components/verify-account';
import PageAddPost from './pages/post/page-add-post';
import PageEbook from './pages/ebook/page-ebook';
import PageEbookDetail from './pages/ebook/page-ebook-detail';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login" >
            <Login />
          </Route>
          <Route exact path="/loginEmail">
            <LoginWithEmail />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/register/verify-email">
            <VerifikasiEmail />
          </Route>
          <Route exact path="/register/create-password">
            <CreatePassword />
          </Route>
          <Route exact path="/register/verify-account">
            <VerifyAccount />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/chatting">
            <Chatting />
          </Route>
          <Route exact path="/chatting/detail">
            <ChattingDetail />
          </Route>
          <Route exact path="/post">
            <PagePost />
          </Route>
          <Route exact path="/add-post">
            <PageAddPost />
          </Route>
          <Route exact path="/ebook">
            <PageEbook />
          </Route>
          <Route exact path="/ebook/detail">
            <PageEbookDetail />
          </Route>
          <Route exact path="/short-video">
            <ShortVideo />
          </Route>
          <Route exact path="/search">
            <PageSearch />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="nav-bottom" color={'primary'}>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeSharp} />
          </IonTabButton>
          <IonTabButton tab="Post" href="/post">
            <IonIcon icon={newspaperSharp} />
          </IonTabButton>
          <IonTabButton tab="short-video" href="/short-video">
            <IonIcon icon={playCircleSharp} />
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchSharp} />
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personSharp} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

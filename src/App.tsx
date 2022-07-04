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

// Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

// CSS SosmedQu
import './theme/app.css';
import { homeSharp, newspaperSharp, playCircleSharp, searchSharp, personSharp, logoVimeo } from 'ionicons/icons';
import VerifyAccount from './components/verify-account';
import PageAddPost from './pages/post/page-add-post';
import PageEbook from './pages/ebook/page-ebook';
import PageEbookDetail from './pages/ebook/page-ebook-detail';
import { getCookie } from 'typescript-cookie'
import ProtectedRoute from './ProtectedRoute';
import MyApi from './helpers/my-api';
import Logout from './pages/auth/page-logout';
import EditePost from './pages/post/page-edite-post';
import UpgradeStudent from './pages/student/upgrade-student';
import FollowerRanking from './pages/student/follower-ranking';

setupIonicReact();

const api = new MyApi()

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" >
              <Login />
            </Route>
            <ProtectedRoute exact path="/logout" >
              <Logout />
            </ProtectedRoute>
            <Route exact path="/login-email">
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
            <ProtectedRoute exact path="/chatting">
              <Chatting />
            </ProtectedRoute>
            <ProtectedRoute exact path="/chatting/detail">
              <ChattingDetail />
            </ProtectedRoute>
            <Route exact path="/post">
              <PagePost />
            </Route>
            <ProtectedRoute exact path="/add-post">
              <PageAddPost />
            </ProtectedRoute>
            <ProtectedRoute exact path="/edite-post/:id">
              <EditePost />
            </ProtectedRoute>
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
            <ProtectedRoute exact path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/upgrade-student">
              <UpgradeStudent />
            </ProtectedRoute>
            <Route exact path="/follower-ranking">
              <FollowerRanking />
            </Route>
            <Route exact path="/">
              <Redirect to="/post" />
            </Route>
            <Route exact path="">
              <Redirect to="/post" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="nav-bottom" color={'primary'}>
            <IonTabButton tab="short-video" href="/short-video">
              <IonIcon icon={logoVimeo} />
              <IonLabel>VidQu</IonLabel>
            </IonTabButton>
            <IonTabButton tab="post" href="/post">
              <IonIcon icon={newspaperSharp} />
              <IonLabel>PostQu</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personSharp} />
              <IonLabel>profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
